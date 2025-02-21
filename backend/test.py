class Customer_accountsSchema(ma.Schema):
    id =db.Column(db.Integer,primary_key=True)
    username = fields.String(required =True)
    password = fields.String(required=True)
    customer_id =fields.Integer(foreign_key=True)
    
    class Meta:
        fields=('username','password','customer_id','id')
        
customer_account_schema=Customer_accountsSchema()
customer_accounts_schema=Customer_accountsSchema(many=True)



class OrderSchema(ma.Schema):
    id = db.Column(db.Integer,primary_key=True)
    order_date =fields.String(required=True)
    customers_id =fields.Integer(foreign_key=True)
    products_id= fields.Integer(foreign_key=True)
    delivery_date=fields.String(required=True)
    
    class Meta:
        fields=('order_date','customers_id','products_id','delivery_date','id')
        
order_schema=OrderSchema()
orders_schema=OrderSchema(many=True)


class Customer_orderSchema(ma.Schema):
    id = db.Column(db.Integer,primary_key=True)
    order_date =fields.String(required=True)
    customer_id =fields.Integer(foreign_key=True)
    product_id= fields.Integer(foreign_key=True)
    delivery_date=fields.String(required=True)
    
    class Meta:
        fields=('order_date','customer_id','product_id','delivery_date','id')
        
customer_order_schema=Customer_orderSchema()
customer_orders_schema=Customer_orderSchema(many=True)


class Order(db.Model):
    __tablename__="Order"
    id = db.Column(db.Integer,primary_key=True)
    order_date=db.Column(db.String(255),nullable=False)
    customer_id=db.Column(db.Integer,db.ForeignKey("customers.id"))
    product_id=db.Column(db.Integer,db.ForeignKey("products.id"))
    delivery_date=db.Column(db.String(255),nullable=False)
    
class Customer_order(db.Model):
    __tablename__="Customer_order"
    id = db.Column(db.Integer,primary_key=True)
    order_date=db.Column(db.String(255),nullable=False)
    customer_id=db.Column(db.Integer,db.ForeignKey("customer.id"))
    product_id=db.Column(db.Integer,db.ForeignKey("products.id"))
    delivery_date=db.Column(db.String(255),nullable=False)
    
class Customer_accounts(db.Model):
    __tablename__="Customer_Accounts"
    id = db.Column(db.Integer,primary_key = True)
    username=db.Column(db.String (255),nullable = False)
    password = db.Column(db.String(255),nullable = False)
    customer_id=db.Column(db.Integer,db.ForeignKey('Customers.id'))
    #customer=db.relationship('Customer',backref='customer_account',uselist=False)


