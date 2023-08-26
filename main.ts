
const userNameForm = document.getElementById('userNameForm')!
userNameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userName: string = getUserName();
    if(IsValidUserName(userName)) {
        userNameIsFine();
        console.log(userName)
    } else {
        userNameIsWrong();
    }
})
const getUserName = (): string => {
    const userNameInput:HTMLInputElement = document.querySelector<HTMLInputElement>('#userNameInput')!;
    return userNameInput.value.trim();
}
const IsValidUserName = (userName: string): boolean => !!userName;
const userNameIsWrong = () => {
    const userNameInput:HTMLInputElement = document.querySelector<HTMLInputElement>('#userNameInput')!;
    userNameInput.classList.add('is-error');
}
const userNameIsFine = () => {
    const userNameInput:HTMLInputElement = document.querySelector<HTMLInputElement>('#userNameInput')!;
    userNameInput.classList.remove('is-error');
}