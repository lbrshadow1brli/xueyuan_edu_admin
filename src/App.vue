<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.spacebetween {
  display: flex;
  justify-content: space-between;
}
.flexEnd {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.flexCenter {
  display: flex;
  justify-content: center;
}
.column {
  display: flex;
  flex-direction: column;
}
.alignCenter {
  display: flex;
  align-items: center;
}
.alignEnd {
  display: flex;
  align-items: flex-end;
}
.justifyCenter {
  display: flex;
  justify-content: center;
}
.flexwrap {
  display: flex;
  flex-wrap: wrap;
}

.fontBold {
  font-weight: bold;
}
.fontBlack40 {
  color: #333333;
  font-size: 40px;
}
.fontBlack36 {
  color: #333333;
  font-size: 36px;
}
.fontBlack30 {
  color: #333333;
  font-size: 30px;
}
.fontBlack28 {
  color: #333333;
  font-size: 28px;
}
.fontBlack24 {
  color: #333333;
  font-size: 24px;
}
.fontBlack18 {
  color: #333333;
  font-size: 18px;
}
.fontBlack14 {
  color: #333333;
  font-size: 14px;
}
.fontBlack12 {
  color: #333333;
  font-size: 12px;
}

.colorwhite {
  color: #ffffff;
}
.colorGray {
  color: #bababa;
}
.colorGreen {
  color: #8DB72B;
}
.colorRed {
  color: #ff0000;
}
.colorOrange {
  color: #ff6e20;
}

.backgroundWhite {
  background-color: #ffffff;
}
.backgroundGray {
  background-color: #ececec;
}
.backgroundOrange {
  background-color: #ff6e20;
}


.marginTop10 {
  margin-top: 10px;
}
.marginTop20 {
  margin-top: 20px;
}
.marginTop40 {
  margin-top: 40px;
}
.marginRight10 {
  margin-right: 10px;
}
.marginRight20 {
  margin-right: 20px;
}
.marginLeft20 {
  margin-left: 20px;
}
.marginLeft200 {
  margin-left: 200px;
}
.padding5 {
  padding:5px;
}
.paddingY20 {
  padding: 20px 0;
}
.paddingX20 {
  padding: 0 20px;
}
.padding20 {
  padding:20px;
}
.paddingBottom20 {
  padding-bottom: 20px;
}
.padding2020 {
  padding: 20px;
}
.padding30 {
  padding: 30px;
}
.padding40 {
  padding: 40px;
}


.width100 {
  width: 100%;
}
.width150 {
  width: 150px;
}
.height150 {
  height: 150px;
}

.borderOrange {
  border: 1px solid #ff6e20;
}
.borderBottom {
  border-bottom: 1px solid #333333;
}
.borderBottomGray {
  border-bottom: 1px solid #eeeeee;
}
.borderShadow {
  box-shadow: 0px 0px 10px 5px #e8e7e7;
}
.borderRadius {
  border-radius: 5px;
}

.lineThrough {
  text-decoration: line-through;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical
}

</style>
