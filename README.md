# Flowtr API Generator (flapi)

This is a node.js app that generates apis using
tailwindcss, mongodb and express.

## Getting Started

You can define the `flapi.json` file as seen below.

```json
{
  "$schema": "./schema.json",
  "modules": [
    {
      "name": "customers",
      "model": {
        "fields": [
          {
            "id": "first_name",
            "displayName": "First Name",
            "type": "string"
          },
          {
            "id": "last_name",
            "displayName": "Last Name",
            "type": "string"
          },
          {
            "id": "email",
            "displayName": "Email",
            "type": "string"
          }
        ]
      }
    }
  ]
}
```

This example creates api routes at `/customers/api` that use mongodb to fetch/create models. It also creates an normal html route using tialwindcss so you can manage your database model with an admin panel.

You can also specify a rules object in the module, so that
the get_all route requires authenication with a specific user role.

```json
{
  "$schema": "./schema.json",
  "modules": [
    {
      "name": "customers",
      "rules": [
        {
          "type": "get_all",
          "auth": {
            "roles": ["admin"]
          }
        }
      ],
      "model": {
        "fields": [
          {
            "id": "first_name",
            "displayName": "First Name",
            "type": "string"
          },
          {
            "id": "last_name",
            "displayName": "Last Name",
            "type": "string"
          },
          {
            "id": "email",
            "displayName": "Email",
            "type": "string"
          }
        ]
      }
    }
  ]
}
````
