import sys
print('Python: ', sys.version)

try: 
    import robot
    print('Robot Framework: ', robot.__version__)
except ImportError:
    print('robot-module not found')

try:
    import Browser
    print("Browser: ", Browser.__version__)
except ImportError:
    print("Browser module not found")

try:
    import requests
    print("requests: ", requests.__version__)
except ImportError:
    print("Request module not found")

try:
    import CryptoLibrary
    print("CryptoLibrary: ", CryptoLibrary.__version__)

except ImportError: 
    print("CryptoLibrary module not found")