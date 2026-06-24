from loan_logic import calculate_loan
from financial_score import calculate_financial_score

print("===== LOAN TEST CASES =====")

print("\nTest Case 1")
print(calculate_loan(100000, 40000, 500000))

print("\nTest Case 2")
print(calculate_loan(50000, 40000, 1000000))

print("\nTest Case 3")
print(calculate_loan(150000, 50000, 300000))

print("\n===== FINANCIAL SCORE TEST CASES =====")

print(calculate_financial_score(100000, 40000, 30000))

print(calculate_financial_score(50000, 45000, 2000))

print(calculate_financial_score(150000, 60000, 50000))