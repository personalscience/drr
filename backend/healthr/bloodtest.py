import json

from typing import Any, List, Dict, Set

# Recursive function to find dictionaries with the keys
def find_keys_in_dict(dat: Any, keys: Set[str]) -> List[Dict[str, Any]]:
    matches = []
    
    if isinstance(dat, dict):
        if keys.issubset(dat.keys()):  # if keys match
            matches.append(dat)
        else:
            for v in dat.values():
                matches.extend(find_keys_in_dict(v, keys))
    elif isinstance(dat, list):
        for v in dat:
            matches.extend(find_keys_in_dict(v, keys))
    
    return matches

# Given a JSON object, return all the biomarkers and their values
def find_biomarkers(dat: Any) -> str:
    keys = {"simpleLabel", "label", "parent", "weight", "targetType", "nonNumerical", "result", "historic", "unit", "ranges", "otherScores", "infoLink"}
    matches = find_keys_in_dict(dat, keys)
    
    # Create a list of dictionaries, each representing a biomarker and its value
    biomarkers = [{"Biomarker": match['simpleLabel'], "Value": match['result']} for match in matches]
    
    return biomarkers  # Return as a JSON object
