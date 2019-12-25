document.addEventListener("DOMContentLoaded", function() {
  // buildBlogs();
  // displayBlogs();
  fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@peterckim96"
  )
    .then(res => res.json())
    .then(data => {
      data.items.forEach(el => {
        new Blog(el);
      });
    })
    .then(function() {
      displayBlogs();
    });
});

/* Parse the Date Object into Plain English */
parseDate = date => {
  const day = date.getDate();
  const year = date.getFullYear();
  let month;

  switch (date.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      month = "January";
  }

  return `${month} ${day}, ${year}`;
};

/* Create Blog Objects from Data */
buildBlogs = () => {
  const blogArray = blogs;
  blogArray.forEach(el => {
    new Blog(el);
  });
};

displayBlogs = () => {
  const blogHTML = document.querySelector("#blogs");
  const allBlogs = Blog.getAll();

  allBlogs.forEach(blog => {
    blogHTML.innerHTML += blog.displayHTML();
  });
};

class Blog {
  static all = [];
  /* 
        Constructor Method
        input: args => {title: title, content: content}
      */
  constructor(args) {
    this.title = args.title;
    this.pubDate = args.pubDate;
    this.link = args.link;
    this.description = args.description;
    this.content = args.content;
    this.views = args.views;
    Blog.all.push(this);
  }

  /* Returns an Array of all Blogs */
  static getAll() {
    return Blog.all;
  }

  displayHTML = () => {
    return `<div class="ui card">
        <div class="content">
          <div class="header">${this.title}</div>
          <div class="meta">${this.pubDate}</div>
          <div class="description">
            <p>
              ${this.content.trunc(100)}
            </p>
          </div>
        </div>
        <div class="extra content">
          ${this.views} Views
        </div>
      </div>`;
  };
}

/* Add Truncate method to String object */
String.prototype.trunc =
  String.prototype.trunc ||
  function(n) {
    return this.length > n ? this.substr(0, n - 1) + "&hellip;" : this;
  };
