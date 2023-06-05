import requests
import re
import json

def lookup_rs_numbers(rs_numbers):
    results = {}
    for rs_number in rs_numbers:
        url = f"https://you.23andme.com/tools/data/?snp_name=rs{rs_number}/"
        response = requests.get(url)
        html_content = response.text

        # Extract the genotype label using regular expressions
        script_pattern = r'"marker_id"\s*:\s*"{}"\s*,\s*"alternate_marker_ids".*?"genotype_label"\s*:\s*"([^"]+)"'.format(rs_number)
        script_match = re.search(script_pattern, html_content)

        if script_match:
            genotype_label = script_match.group(1)
            if genotype_label != "not genotyped":
                results[rs_number] = genotype_label
        else:
            results[rs_number] = "not genotyped"

    return results

# Example usage
rs_numbers = ['429358', '7412', '1801282', '1801133', '1799945', '662', '428']
rs_results = lookup_rs_numbers(rs_numbers)

# Print the results
for rs_number, genotype_label in rs_results.items():
    print(f"RS Number: {rs_number}")
    print(f"Genotype Label: {genotype_label}")
    print()

