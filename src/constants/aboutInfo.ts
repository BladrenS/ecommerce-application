import { me, me1, me2 } from '../assets';

export type about = {
  link: string;
  name: string;
  photo: string;
  location: string;
  git: string;
  header: string;
  done: string[];
  text: string;
  contribution: string[];
};

export const aboutInfo: about[] = [
  {
    link: 'https://github.com/BladrenS',
    name: 'Denis Gorbunov',
    photo: me,
    location: 'Omsk, Russia',
    git: 'BladrenS',
    header: 'Cry, scream, break down — but keep moving forward until you get there.',
    done: ['Feature', 'Team Lead', 'Design', 'CI/CD', 'Tests'],
    text: 'Aloha! I`m Denis, 27 years old, from frosty Omsk in Russia. I enjoy spending time with my pets—a Labrador and a Maine Coon—and coding. But what I truly love is solving various challenges, which is exactly why I ended up here. The course was both valuable and exciting, and the final team challenge was incredibly engaging and addictive, thanks to our team dynamic and the guidance of our amazing mentor. By the end of the course, I can confidently say that my passion for development has  deepened significantly.',
    contribution: ['Detailed product page', 'About us page', 'Main page', 'News', 'Wishlist', 'Login page'],
  },
  {
    link: 'https://github.com/cayman444',
    name: 'Arthur Savin',
    photo: me1,
    location: 'Penza, Russia',
    git: 'cayman444',
    header: 'The pain is temporary. The progress is permanent.',
    done: ['Feature', 'API'],
    text: "Hello! My name is Arthur. I am a student who is passionate about front-end development. This course was a great opportunity for me to improve my skills. I found the final assignment very exciting and interesting, and thanks to teamwork, we were able to complete the task. It's nice to see the results after all the work!",
    contribution: ['Login page', 'Catalog page'],
  },
  {
    link: 'https://github.com/velteren',
    name: 'Constantine Saveliev',
    photo: me2,
    location: 'City 17, Russia',
    git: 'velteren',
    header: `There is only one limitation. It's your mind. Get past that limitation and life will be a whole different color.`,
    done: ['Feature', 'Design', 'CI/CD', 'API'],
    text: `Hi! I'm Constantine, a passionate frontend developer with a strong interest in creating responsive, user-friendly web applications. During this course, I've gained hands-on experience with HTML, CSS, JavaScript, and modern frameworks like React. This final project represents my journey in mastering frontend development and my commitment to building clean, efficient, and visually appealing websites.`,
    contribution: ['Registration page', 'Basket page', 'Whishlist'],
  },
];
