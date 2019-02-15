# juglans-roles
Provide role and permission validation.

- Example:  
```javascript
app.Use(Roles({
  async failureHandler(ctx, action){
    ctx.status = 403
    ctx.body = {
      message: 'access Denied, you don\'t have permission.'
    }
  },
  async roleHandler(ctx, action) {
    const [role, permission] = action.split('@')
    const accessData = await Identity.getAccessData(ctx)
    return true
  }
})
app.Use(function ({ router, roles }) {
  router.get('/rolesTest', roles.can('role1@permit1'), async ctx => {
  })
})

```
## MIT License

Copyright (c) 2018-2020 Double

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
