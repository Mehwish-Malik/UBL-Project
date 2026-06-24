def calculate_loan(income, expenses, loan_amount):

    disposable_income = income - expenses

    score = 50

    if disposable_income > 50000:
        score += 30
    elif disposable_income > 20000:
        score += 10

    if loan_amount <= income * 12:
        score += 20

    if score >= 80:
        status = "Eligible"
        risk = "Low"
    elif score >= 60:
        status = "Review Needed"
        risk = "Medium"
    else:
        status = "Not Eligible"
        risk = "High"

    return {
        "score": score,
        "status": status,
        "risk": risk
    }