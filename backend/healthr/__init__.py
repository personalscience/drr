
# inside of __init__.py

import logging
import logging

def setup_logger(logger_name='root', log_file='drr.log', console_log_level=logging.DEBUG, file_log_level=logging.DEBUG):
    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.DEBUG)  # Set overall logger level to debug (lowest level)

    # Create console handler with its own level (default: DEBUG)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(console_log_level)

    # Create file handler which logs all messages (default: DEBUG)
    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(file_log_level)

    # Create formatter and add it to the handlers
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)


def _drr_log(msg, logger_name='root'):
    logger = logging.getLogger(logger_name)
    msg_head = msg[:50]
    msg_tail = msg[-50:] if len(msg) > 100 else ""
    logger.debug(f"{msg_head}...{msg_tail}")  # Log to console
    logger.debug(msg)  # Log full message to file

# Example usage:
setup_logger()  # Run this once at the start of your program
_drr_log('Loading the healthr package now')  # Call this wherever you need to log
