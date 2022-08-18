import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl: 'https://vmspace.com/ActiveFile/spacem.org/board_img/94821280661808cd6500e4.jpg',
        user: USERS[0].user,
        likes: 7870,
        caption: 'Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. Train Ride to Hogwarts. ',
        date: '경상북도 영덕군 22.05.20',
        // tag: ['영덕_양조장', '도원결의', '증류주'],
        profile_picture: USERS[0].image,
        comments: [
            {
                user: "theqazman",
                comment: 'Wow! This build looks fire. Super excited about'
            },
            {
                user: "amaanath.dev",
                comment: "Once I wake up, I'll finally be ready to code this up!"
            },
        ],
    },
    {
        imageUrl: 'https://vmspace.com/ActiveFile/spacem.org/board_img/94821280661808cd6500e4.jpg',
        user: USERS[1].user,
        likes: 3500,
        caption: 'Train Ride to Hogwarts. ',
        date: '경상북도 영덕군 22.05.20',
        // tag: ['영덕_양조장', '도원결의', '증류주'],
        profile_picture: USERS[1].image,
        comments: [
            {
                user: "theqazman",
                comment: 'Wow! This build looks fire. Super excited about'
            },
            {
                user: "amaanath.dev",
                comment: "Once I wake up, I'll finally be ready to code this up!"
            },
        ],
    },
]