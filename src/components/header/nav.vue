<template>
<nav>
  <div>
    <div class="svg-container">
      <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
      >
        <path
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                stroke-linecap="round"
                stroke-linejoin="round"
        />
      </svg>
    </div>
    <div>Globe Express</div>
  </div>
  <div>
    
    <div class="active"><router-link to="/" replace> Home </router-link></div>
    <div>Holidays</div>
    <div>Destinations</div>
    <div>Flights</div>
    <div>Offers</div>
    <div>Contact</div>
    <div><router-link to="/timeLine" replace> TimeLine </router-link></div>
    <div class="svg-container">
      <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
      >
        <path
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                stroke-linecap="round"
                stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="svg-container">
      <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
      >
        <path
                clip-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                fill-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</nav>
</template>

<style scoped>
nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 36px;
  font-weight: 500;
  color: white;
}
nav svg {
  width: 20px;
  height: 20px;
}
nav .svg-container {
  width: 20px;
  height: 20px;
}
nav > div {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 14px;
}
nav > div:first-child {
  gap: 10px;
}
nav > div:last-child {
  gap: 24px;
}
nav > div:last-child > .active {
  position: relative;
}
nav > div:last-child > .active:after {
  bottom: -8px;
  left: 0;
  right: 0;
  position: absolute;
  content: "";
  height: 3px;
  border-radius: 99px;
  background-color: #ecad29;
}

</style>