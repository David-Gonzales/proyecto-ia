from flask import render_template, request, jsonify
from app import app
from app.models import Usuario

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcularRuta', methods=['POST'])
def calcularRuta():
    if request.method == 'POST':
        datos = request.get_json()
        origen = datos.get('origen')
        destino = datos.get('destino')
        resultado = f'{origen} -> {destino}'
        return jsonify({'resultado': resultado})