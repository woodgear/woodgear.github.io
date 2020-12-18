# [[l-function]]
[bash-function](https://ryanstutorials.net/bash-scripting-tutorial/bash-functions.php)
```bash
# Passing arguments to a function
print_something () {
echo Hello $1
}
print_something Mars
print_something Jupiter


print_something () {
echo Hello $1
return 5
}
print_something Mars
print_something Jupiter
echo The previous function has a return value of $?
```
## [[l-var-define]]