from flask import Flask, jsonify, request
from flask_cors import CORS
from web3 import Web3
import os
import json
from dotenv import load_dotenv
from models import db, Wallet, BalanceCheck
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create tables within app context
with app.app_context():
    db.create_all()

# Connect to Polygon network
POLYGON_RPC_URL = os.getenv('POLYGON_RPC_URL', 'https://polygon-rpc.com')
w3 = Web3(Web3.HTTPProvider(POLYGON_RPC_URL))

# USDT contract address on Polygon
USDT_CONTRACT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'  # Polygon USDT
USDT_ABI = json.loads('''[
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    }
]''')

usdt_contract = w3.eth.contract(address=USDT_CONTRACT_ADDRESS, abi=USDT_ABI)

@app.route('/api/generate-address', methods=['POST'])
def generate_address():
    """Generate a new Polygon wallet address and store it in the database"""
    try:
        account = w3.eth.account.create()
        address = account.address
        private_key = account.key.hex()
        
        # Store the wallet in the database
        new_wallet = Wallet(
            address=address,
            private_key=private_key
        )
        
        db.session.add(new_wallet)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'address': address,
            'private_key': private_key  # WARNING: Never expose in production
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/check-balance', methods=['POST'])
def check_balance():
    """Check USDT balance for a given address and store the result"""
    try:
        data = request.get_json()
        address = data.get('address')
        
        if not address:
            return jsonify({'success': False, 'error': 'Address is required'}), 400
            
        if not w3.is_address(address):
            return jsonify({'success': False, 'error': 'Invalid address format'}), 400
        
        # Get USDT balance
        balance_wei = usdt_contract.functions.balanceOf(address).call()
        balance = balance_wei / 10**6  # USDT has 6 decimals
        
        # Find the wallet in the database if it exists
        wallet = Wallet.query.filter_by(address=address).first()
        wallet_id = wallet.id if wallet else None
        
        # Store the balance check in the database
        balance_check = BalanceCheck(
            wallet_id=wallet_id,
            address=address,
            balance=balance
        )
        
        db.session.add(balance_check)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'address': address,
            'balance': balance
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/wallets', methods=['GET'])
def get_wallets():
    """Get all wallets from the database"""
    try:
        wallets = Wallet.query.order_by(Wallet.created_at.desc()).all()
        return jsonify({
            'success': True,
            'wallets': [wallet.to_dict() for wallet in wallets]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/balance-history/<address>', methods=['GET'])
def get_balance_history(address):
    """Get balance history for a specific address"""
    try:
        if not w3.is_address(address):
            return jsonify({'success': False, 'error': 'Invalid address format'}), 400
            
        balance_checks = BalanceCheck.query.filter_by(address=address).order_by(BalanceCheck.checked_at.desc()).all()
        return jsonify({
            'success': True,
            'address': address,
            'history': [check.to_dict() for check in balance_checks]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 