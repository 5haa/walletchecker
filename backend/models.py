from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Wallet(db.Model):
    __tablename__ = 'wallets'
    
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(42), unique=True, nullable=False)
    private_key = db.Column(db.String(66), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    balance_checks = db.relationship('BalanceCheck', backref='wallet', lazy=True)
    
    def __repr__(self):
        return f'<Wallet {self.address}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'address': self.address,
            'private_key': self.private_key,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class BalanceCheck(db.Model):
    __tablename__ = 'balance_checks'
    
    id = db.Column(db.Integer, primary_key=True)
    wallet_id = db.Column(db.Integer, db.ForeignKey('wallets.id'), nullable=True)
    address = db.Column(db.String(42), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    checked_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<BalanceCheck {self.address}: {self.balance}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'address': self.address,
            'balance': self.balance,
            'checked_at': self.checked_at.isoformat() if self.checked_at else None
        } 