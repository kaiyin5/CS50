# Save user input
userInput = input("Emojifying!\n")

# Replace :) or :( with 🙂 or 🙁
output = userInput.replace(":)", "🙂").replace(":(", "🙁")

# Print the result
print(output)