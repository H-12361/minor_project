# Search Feature Implementation Plan

## Information Gathered
- Project is a listing app with frontend and backend.
- Listings have fields: title, description, image, price, location, country, reviews, owner.
- Navbar has a search form but it's not functional.
- Index controller fetches all listings without filtering.
- User wants backend search based on location (place).

## Plan
- Update navbar.ejs to make search form functional: submit GET request to /listing with query param 'location'.
- Modify index controller in controllers/listing.js to filter listings by location if query param is present.
- Use regex for case-insensitive partial matching on location field.

## Dependent Files to Edit
- views/include/navbar.ejs
- controllers/listing.js

## Followup Steps
- Test the search functionality by submitting the form and checking filtered results.
- Ensure no errors in console.
- Possibly add client-side feedback if no results found.

## Progress
- [x] Update navbar.ejs
- [x] Update controllers/listing.js
- [x] Test implementation
