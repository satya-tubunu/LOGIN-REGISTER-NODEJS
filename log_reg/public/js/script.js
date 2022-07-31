{/* <div class="login">
<h2>login</h2>
<!-- showing error in the form of ejs -->

<% if( error!="" ){ %>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong> Error </strong>
        <%= error %>.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <% } %>

        <form action="/login" method="POST">
            <input type="hidden" name="_csrf" value="<%= csrfToken %>">

            <label for="email">Email</label><br>
            <input type="email" name="email" id=""><br>
            <label for="email">Password</label><br>
            <input type="password" name="password" id=""><br><br>
            <button type="submit">login</button>
        </form>

        <p>don't have account
            <a href="/register">Register</a>
        </p>
</div> */}