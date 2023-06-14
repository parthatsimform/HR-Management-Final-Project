<template>
  <div class="about">
    <div class="about-wrapper">
      <div class="about-personal-info mx-auto mt-5">
        <h3 class="fs-3">Employee Details</h3>
        <hr />
        <div class="personal-detail">
          <div class="container ms-4">
            <div class="row">
              <div class="col-4">Name</div>
              <div class="col-8">John Doe</div>
            </div>
            <div class="row">
              <div class="col-4">Email</div>
              <div class="col-8">john@gmail.com</div>
            </div>
            <div class="row">
              <div class="col-4">Mobile</div>
              <div class="col-8">9874157841</div>
            </div>
            <div class="row">
              <div class="col-4">Joining Date</div>
              <div class="col-8">24-01-2020</div>
            </div>
            <div class="row">
              <div class="col-4">DOB</div>
              <div class="col-8">24-01-1995</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-personal-info {
  max-width: 600px;
  height: 400px;
}
.about-personal-info h3{
    margin-top: 80px;
}
.about-personal-info h3,col-4, col-8 {
  color: #4e4e4e;
}
.row{
    height: 40px;
}
.container {
max-width: 550px;
}
</style>
