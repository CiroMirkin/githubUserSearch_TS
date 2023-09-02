
const userNameForm = document.getElementById('userNameForm')!
userNameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userName: string = getUserName();
    if(IsValidUserName(userName)) {
        userNameIsFine();
        new SearchUserInfo().search(userName);
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
    userNameInput.value = '';
}

interface userInfoModel { 
    photo: string,
    bio: string,
    userName: string,
    name: string,
    email: string,
    date: string,
    location: string,
    site: string,
    twiter: string,
    github: string,
}

const showUserInfo = (userInfo: userInfoModel) => {
    const userInforHTMLContainer = document.getElementById("userInformation")!;
    userInforHTMLContainer.innerHTML = `
    <header class="user-information">
        <div class="img">
            <img src="${userInfo.photo}" alt="" class="img__img">
        </div>
        <div class="user">
            <p class="user__name nes-text is-primary">${userInfo.name}</p>
            <p class="user__user-name">${userInfo.userName}</p>
            <p class="user__date">${userInfo.date}</p>
            <a href="${userInfo.github}" class="user__github-link"><i class="nes-icon github"></i></a>
        </div>
    </header>
    <div class="lists">
        <p>${userInfo.bio}</p>
        <ul class="nes-list is-disc">
        <li><a href="${userInfo.site}">Web</a></li>
        <li>Location: ${userInfo.location}</li>
        <li>Email: ${userInfo.email}</li>
        <li>Twiter: ${userInfo.twiter}</li>
        </ul>
    </div>
    `
}

// 

class SearchUserInfo {
    constructor() {
        
    }

    search(userName: string) {
        const github = new Github()
        const userdata = github.searchUser(userName, showUserInfo);
    }
}

class Github {
    URL_GitHub: string;
    constructor() {
        this.URL_GitHub = "https://api.github.com/users/";
    }
    searchUser(userName: string, showUserInfo: Function) {
        const URL = `${this.URL_GitHub}${userName}`;
        this.getUserInfo(URL, showUserInfo);
    }
    private getUserInfo(URL , callback: Function) {
        fetch(URL).then( r => r.json()).then( userData => {
            console.log(userData)
            userData = this.formatUserData(userData);
            callback(userData);
        })
    }
    private formatUserData (userData): userInfoModel {
        const formatDate = (date: string) => {
            return new Date(date || "").toLocaleDateString("en-Us",{
                year:"numeric",
                month:"long",
                day:"numeric",
            })
        }
        const { avatar_url, bio, blog, created_at, email, location, name, login, twitter_username, html_url } = userData;
        const userInfo: userInfoModel = {
            photo: avatar_url,
            userName: `@${login}`,
            name,
            bio,
            date: formatDate(created_at || ""),
            location: (location || ""),
            email: (email || ""),
            site: (blog || "#"),
            twiter: (twitter_username || ""),
            github: html_url,
        }
        return userInfo
    }
}