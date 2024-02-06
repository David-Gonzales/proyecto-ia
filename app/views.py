from flask import render_template, request, jsonify
from app import app
import random

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calcularRuta', methods=['POST'])
def calcularRuta():
    datos = request.get_json()
    tsp = [list(map(float, row)) for row in datos]
    resultado = escalada(tsp)
    print(resultado)
    return jsonify({'lista': resultado[0],
        'costo': resultado[1]})


def solucionAleatoria(tsp):
    ciudades = list(range(len(tsp)))
    solucion = []

    # Selecciona aleatoriamente una ciudad sin repetición
    for i in range(len(tsp)):
        ciudadAleatoria = ciudades[random.randint(0, len(ciudades) - 1)]
        solucion.append(ciudadAleatoria)
        ciudades.remove(ciudadAleatoria)

    return solucion

# Función que calcula la longitud de una ruta dada una solución
def longitudRuta(tsp, solucion):
    longitudRuta = 0
    for i in range(len(solucion)):
        longitudRuta += tsp[solucion[i - 1]][solucion[i]]
    return longitudRuta

# Función que genera vecinos intercambiando dos ciudades en la solución
def obtenerVecinos(solucion):
    vecinos = []
    for i in range(len(solucion)):
        for j in range(i + 1, len(solucion)):
            vecino = solucion.copy()
            vecino[i] = solucion[j]
            vecino[j] = solucion[i]
            vecinos.append(vecino)
    return vecinos

# Función que encuentra el mejor vecino dada una lista de vecinos
def obtenerMejorVecino(tsp, vecinos):
    mejorLongitudRuta = longitudRuta(tsp, vecinos[0])
    mejorVecino = vecinos[0]
    
    # Itera sobre los vecinos para encontrar el mejor
    for vecino in vecinos:
        longitudActual = longitudRuta(tsp, vecino)
        if longitudActual < mejorLongitudRuta:
            mejorLongitudRuta = longitudActual
            mejorVecino = vecino
    return mejorVecino, mejorLongitudRuta

# Algoritmo de escalada: Mejora iterativamente la solución hasta que no hay un vecino mejor
def escalada(tsp):
    solucionActual = solucionAleatoria(tsp)
    longitudRutaActual = longitudRuta(tsp, solucionActual)
    vecinos = obtenerVecinos(solucionActual)
    mejorVecino, mejorLongitudVecino = obtenerMejorVecino(tsp, vecinos)

    # Continúa iterando hasta que no haya un vecino mejor
    while mejorLongitudVecino < longitudRutaActual:
        solucionActual = mejorVecino
        longitudRutaActual = mejorLongitudVecino
        vecinos = obtenerVecinos(solucionActual)
        mejorVecino, mejorLongitudVecino = obtenerMejorVecino(tsp, vecinos)

    return solucionActual, longitudRutaActual