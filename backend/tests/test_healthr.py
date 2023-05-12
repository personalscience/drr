import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from healthr.recommendations import generate_health_recommendation, calculate_bmi

def test_calculate_bmi():
    assert calculate_bmi(55, 11) == 36.4

