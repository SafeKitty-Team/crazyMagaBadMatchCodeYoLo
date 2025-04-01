import random as рандом
import string as строка


def рандом_ники(length):
	"""Создание рандомных ников из любых символов"""
	characters = строка.printable
	result = ''.join(рандом.choice(characters) for _ in range(length))
	return result
