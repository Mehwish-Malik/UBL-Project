def calculate_financial_score(income, expenses, savings):

    score = 50

    savings_ratio = savings / income

    if savings_ratio >= 0.30:
        score += 30
    elif savings_ratio >= 0.20:
        score += 20
    elif savings_ratio >= 0.10:
        score += 10

    if expenses < income * 0.70:
        score += 20

    if score > 100:
        score = 100

    if score >= 80:
        status = "Excellent"
    elif score >= 60:
        status = "Good"
    else:
        status = "Needs Improvement"

    return {
        "score": score,
        "status": status
    }