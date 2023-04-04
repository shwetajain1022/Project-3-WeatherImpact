
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from datetime import datetime
from dateutil.relativedelta import relativedelta

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///AllAus_Weather_History11.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
AusCityWeather = Base.classes.auscityweather

# def getlastyeardate(session):
#     latest_date = session.query(func.max(AusCityWeather.date)).first()[0]
#     latest_date = datetime.strptime(latest_date, '%Y-%m-%d')
#     last_year_date = latest_date - relativedelta(years=1)
#     return last_year_date.strftime('%Y-%m-%d')
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/rainfall/<location></br>"
        f"/api/v1.0/rainfall/<location>/<year></br>"
    )

# Returns city weather history
@app.route("/api/v1.0/rainfall/<location>")
def start(location):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #get the list of date, minimum maximum and average of the temperature greater than equal to start date
    results = session.query(AusCityWeather.Date,AusCityWeather.MinTemp ,AusCityWeather.MaxTemp,AusCityWeather.Rainfall).\
    filter(AusCityWeather.Date == location).\
    order_by(AusCityWeather.Date).all()

    #return the result as a list of dicts
    results_json = []
    for date,mintemp,maxtemp,rainfall in results:
        temp_results = {}
        temp_results["date"]= date
        temp_results["mintemp"] = mintemp
        temp_results["maxtemp"]= maxtemp
        temp_results["Rainfall"] = rainfall
        results_json.append(temp_results)

    return jsonify(results_json)

# Returns the min, max, and average temperatures calculated from the given start date to the given end date
@app.route("/api/v1.0/rainfall/<location>/<year>")
def startend(location,year):
    # Create our session (link) from Python to the DB
    session = Session(engine)

    #get the list of date, minimum maximum and average of the temperature greater than equal to start date
    results = session.query(AusCityWeather.Date,AusCityWeather.MinTemp ,AusCityWeather.MaxTemp,AusCityWeather.Rainfall).\
    filter(AusCityWeather.Location == location and AusCityWeather.Date.strftime("%Y") == year).\
    order_by(AusCityWeather.Date).all()

    #return the result as a list of dicts
    results_json = []
    for date,mintemp,maxtemp,rainfall in results:
        temp_results = {}
        temp_results["date"]= date
        temp_results["mintemp"] = mintemp
        temp_results["maxtemp"]= maxtemp
        temp_results["Rainfall"] = rainfall
        results_json.append(temp_results)

    return jsonify(results_json)

#run the app using Flask
if __name__ == '__main__':
    app.run()