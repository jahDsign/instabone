# INSTABONE
A BackboneJS Single Page Application interacting with Instagram's API

## Live Link
[http://jahdsign.com/instabone/#feed](http://jahdsign.com/instabone/#feed)

## Details
The application is composed of 2 pages and a navigation:

- Navigation:
  - Generated from the template **#template-main-nav** located in **index.html** and the **MainNav view**

- Index Page:
  - Generated from the template **#template-index-page** located in **index.html** and the **IndexPage view**
  - When Index page is accessed, **app.js** instanciates **IndexPage view** which renders the view into the page
  - If **IndexPage view** has already been instanciated, it refreshes the view into the page

- Feed Page:
  - Generated from the template **template-insta-feed** and **template-insta-feed-item** located in **index.html** and the **InstaFeed view** and **InstaFeedList nested view**
  - When Feed page is accessed, **app.js** instanciates**InstaFeed view** and **InstagramItems collection** which fetches the Instagram API's data
  - The data is parsed and added to **InstagramItem model**
  - **InstagramItems collection** is prepared for the next call and triggers notifications if the feed ends and when the model is ready
  - **InstaFeed view** instanciates **InstaFeedList nested view**, renders the list container and listens to the collection's notifications
  - When the data has been added to the model, **InstaFeed view** renders **InstaFeedList nested view** which parses the model and appends the items to the view
  - When the Load More button is clicked, **InstagramItems collection** fetches the new data
  - If the feed ends, **InstaFeed view** removes the load more button and a flag is set to remove it in case of a refresh
  - If **InstaFeed view** and **InstaFeedList nested view** have already been instanciated, the refresh the views into the page

## Application's structure
```
index.html	(web application)
  - [css]	(css files folder)
    - reset.css	(reset elements styles)
    - instabone.css	(application's styles)
  - [img]	(images folder)
  - [js]	(javascript files folder)
    - app.js	(main application's scripts)
    - [vendor]	(vendor scripts folder)
    - [models]	(models files folder)
      - instabone.js	(contains application's models)
    - [collections]	(collections files folder)
      - instabone.js	(contains application's collections)
    - [views]	(views files folder)
      - instabone.js	(contains application's views)
    - [utility]	(utility files folder)
      - instabone.js	(contains application's utility scripts)
```

## Potential Further Improvements
  - Extract templates from index.html and create separate files in a templates folder
  - Split each views in views/instabone.js into different files
  - Add loading feedback while the app is fetching the Instagram's data
  - Add feedback in case the Instagram's feed returns an error