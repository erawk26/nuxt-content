import { company } from '~/site.info.js'
export default {
  fname: company.name.split(' ')[0],
  lname: company.name.split(' ')[1],
  title: 'Web Developer',
  email: {
    url: `mailto:${company.email}`,
    label: company.email,
  },
  mobile: {
    url: `tel:${company.phone}`,
    label: `${company.phone.replace('+1-', '').replace(/-/gi, '.')}`,
  },
  linkedin: {
    url: `https://linkedin.com/in/${company.linkedin}`,
    label: `linkedin.com/in/${company.linkedin}`,
  },
  website: {
    url: company.website,
    label: company.website.replace(/(^\w+:|^)\/\//, ''),
  },
  skills: {
    'HTML, SCSS': 5,
    'JS, ES6+, VanillaJS': 5,
    'Vue / Nuxt': 4.75,
    'React / Angular': 3.75,
    'Drupal 7/8/9': 5,
    WordPress: 4.5,
    'Greensock / Animations': 4.5,
    'Google APIs': 4.5,
    'GIT, CI': 5,
    'SSH, SCP, SFTP': 5,
    'REST, GraphQL, AJAX': 5,
    'AWS / Netlify': 4.25,
    'Communication / Reliability': 5,
  },
  experience: [
    {
      company: 'Miles Partnership',
      start: '2018-07-01',
      end: 'Present',
      position: 'Web Developer',
      desc:
        "I'm currently responsible for all aspects of development when it comes to building highly scalable destination marketing websites in Drupal 7, 8 and 9; as well as Vue. All these sites are ADA compliant, cross browser compatible, and leverage many 3rd party APIs.",
    },
    {
      company: 'Hark Inc.',
      start: '2017-02-01',
      end: '2018-03-01',
      position: 'Web Developer',
      desc:
        'Building interactive, responsive, cutting edge, corporate websites in mainly Drupal and WordPress. Utilizing HTML, SCSS, Javascript, jQuery, PHP, Composer, SSH, and Git. I was responsible for efficiently developing a complete website from a PSD mockup to finished state; while ensuring cross browser compatibility and fast page loads.',
    },
    {
      company: 'Majorwise',
      start: '2016-09-01',
      end: '2017-02-01',
      position: 'Front End Developer',
      desc:
        'Developing an interactive Job Board / Intern app for colleges. I was solely responsible for building the entire front end on Git utilizing AngularJS, SCSS, Jade/Pug, Node, MongoDB, and Express.',
    },
    {
      company: 'Freelance',
      start: '2016-06-01',
      end: '2017-02-01',
      position: 'Web Developer / Programmer',
      desc:
        'Designing and developing websites using HTML, CSS, PHP, Javascript, AngularJS, jQuery and sometimes Drupal or WordPress.',
    },
    {
      company: 'BaristasBeans.com',
      start: '2006-02-01',
      end: '2016-10-01',
      position: 'Web Developer / Owner',
      desc:
        'Owner/operator of boutique coffee roasting company with wholesale and retail accounts. The eCommerce site is built off of Drupal CMS in a LAMP backend. Administered via SSH.',
    },
  ],
  education: [
    {
      orginization: 'FREECODECAMP.COM',
      category: 'Front End Certification',
      desc:
        'Using HTML5, CSS3, Sass, JavaScript, jQuery, and and GitHub to build fully responsive, interactive websites that stand apart from the usual templates.',
    },
    {
      orginization: 'Lynda.com',
      category: 'Web Design / Development',
      desc:
        'Best standards and practices using Adobe’s design suite & Macromedia Flash.',
    },
  ],
}
