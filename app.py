from flask import Flask, render_template, redirect, url_for, request, flash, session
from flask_sqlalchemy import SQLAlchemy
import os
import re
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "1234"  # Needed for session and flash messages

# MySQL Database Configuration
DB_NAME = "selfcare"    
USERNAME = "root"
PASSWORD = "sug@mramsund@r123"
HOST = "localhost"

# Configure Flask to use the database
database_url = os.getenv("DATABASE_URL")
if not database_url:
    raise RuntimeError("DATABASE_URL environment variable not set")

# Make sure to use the psycopg3 scheme
database_url = database_url.replace("postgres://", "postgresql+psycopg")
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False




db = SQLAlchemy(app)

# Define User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Storing hashed passwords

# Create tables
with app.app_context():
    db.create_all()
@app.route('/', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        email = request.form.get('email', '').strip()
        age = request.form.get('age', '').strip()
        password = request.form.get('password', '').strip()

        print(f"DEBUG: username='{username}', email='{email}', age='{age}', password='{password}'")  # Debugging

        # **Form Validations**
        if not username or not email or not age or not password:
            flash("All fields are required!", "danger")
            return redirect(url_for('registration'))  # Redirect back to the form

        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):  # Check email format
            flash("Invalid email format!", "danger")
            return redirect(url_for('registration'))

        if not age.isdigit() or int(age) < 13:  # Ensure age is a number and ≥ 13
            flash("Age must be a number and at least 13!", "danger")
            return redirect(url_for('registration'))

        if len(password) < 6:  # Ensure password is at least 6 characters long
            flash("Password must be at least 6 characters long!", "danger")
            return redirect(url_for('registration'))

        if User.query.filter_by(email=email).first():  # Check if email already exists
            flash("Email is already registered!", "danger")
            return redirect(url_for('registration'))

        try:
            # **Hash password before storing**
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            new_user = User(username=username, email=email, age=int(age), password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            flash("Registration successful! You can now log in.", "success")
            return redirect(url_for('login'))  # Redirect to login page
        except Exception as e:
            db.session.rollback()
            flash(f"Error storing data: {e}", "danger")
            return redirect(url_for('registration'))

    return render_template('registration.html')  # Show registration form

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()

        if not email or not password:
            flash("All fields are required!", "danger")
            return redirect(url_for('login'))

        # Check if user exists
        user = User.query.filter_by(email=email).first()
        if not user:
            flash("User not found!", "danger")
            return redirect(url_for('login'))

        # Check if password matches hashed password
        if not check_password_hash(user.password, password):
            flash("Incorrect password!", "danger")
            return redirect(url_for('login'))

        # Login successful, store user session
        session['user_id'] = user.id
        session['username'] = user.username
        flash("Login successful!", "success")
        return redirect(url_for('home'))

    return render_template('login.html')



@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/pomodoro')
def pomodoro():
    return render_template('pomodoro.html')

@app.route('/fitness')
def fitness():
    return render_template('fitness.html')

@app.route('/remeals')
def remeals():
    return render_template('remeals.html')

@app.route('/journal')
def journal():
    return render_template('journal.html')

@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html')

@app.route('/rpg')
def rpg():
    return render_template('rpg.html')

@app.route('/exercise')
def execise():
    return render_template('execise.html')

@app.route('/metabolism')
def metabolism():
    return render_template('metabolism.html')

@app.route('/loneliness')
def loneliness():
    return render_template('loneliness.html')

@app.route('/energy')
def energy():
    return render_template('energy.html')

@app.route('/breathing')
def breathing():
    return render_template('breathing.html')

if __name__ == '__main__':
    app.run(debug=True)
