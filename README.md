autoform-file
=============

A smart package for meteor that allows uploading and managing files with [aldeed:autoform](https://github.com/aldeed/meteor-autoform), along with a progress bar. Uses Bootstrap-3 for UI elements.

This package has been built on top of the (yogiben:autoform-file)[https://github.com/yogiben/meteor-autoform-file] smart package. All dependencies of the initial package have been removed and the Bootstrap-3-based progress bar has been added.

The examples provided below are for illustration only; they are insecure as anyone can upload / download every file.

1) Install `meteor add naxio:autoform-file`

2) Create your collectionFS (See [collectionFS](https://github.com/CollectionFS/Meteor-CollectionFS))
```
Images = new FS.Collection("images",
  stores: [new FS.Store.GridFS("images", {})]
)
```
3) Make sure the correct allow rules & subscriptions are set up
```
Images.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc, fieldNames, modifier){
    return true;
  },
  download: function(userId){
    return true;
  }
```
and
```
Meteor.publish('images', function(){
  return Images.find();
}
```
and in your router.js (inside `Router.map`):
```
  this.route("profile", {
    waitOn: function(){
      return Meteor.subscribe('images');
    }
  );
```
4) Create an autoForm template
```
{{#autoForm id="profilePicture" type='update' collection=Users doc=User}}
  {{> afFileUpload name="profile.profilePicture" collection='Images'}}
	<button type="submit" class="btn btn-primary">Update</button>
{{/autoForm}}
```
The `afFieldUpload` is the first part of this tutorial unique to this package.

The `name` property is the field name as per your [collection2](https://github.com/aldeed/meteor-collection2) schema.

The `collection` is the name of your FS.Collection.
