import sys

import numpy as np

def handler(event, context):
    random = np.random.randint(2, size=10)
    return f'Hello from AWS Lambda using Python {sys.version}! random numbers: {random}'   