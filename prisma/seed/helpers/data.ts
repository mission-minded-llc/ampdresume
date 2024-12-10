export const testUsers = [
  {
    email: "john@openresume.org",
    name: "John Doe",
    slug: "john-doe",
    displayEmail: "johnny.doe@openresume.org",
    location: "Los Angeles, CA",
    siteTitle: "John Doe's OpenResume",
    title: "Designer",
  },
  {
    email: "jane@openresume.org",
    name: "Jane Doe",
    slug: "jane-doe",
    displayEmail: "jane.doe@openresume.org",
    location: "New York, NY",
    siteTitle: "Jane Doe's OpenResume",
    title: "Senior Software Engineer",
  },
];

export const testUserEmails = testUsers.map((user) => user.email);
