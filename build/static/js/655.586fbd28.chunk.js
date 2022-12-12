"use strict";(self.webpackChunkbbodeeo=self.webpackChunkbbodeeo||[]).push([[655],{3655:function(n,e,t){t.r(e),t.d(e,{default:function(){return fn}});var i,r,o,s,a,c,d,l,u,p,x,f,h,v,g,m,Z,k,b,j,w,y,N=t(2791),S=t(168),P=t(4165),C=t(5861),U=t(885),z=t(4600),A=t(7691),D=t(2850),I=t(1044),E=t(6618),T=t(6093),O=t(7749),B=t(1413),M=t(7218),G=t(4513),H=t(184),_=A.ZP.div(i||(i=(0,S.Z)(["\n  z-index: 12;\n  bottom: ",";\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: ",";\n  padding: 0% 5%;\n  background-color: var(--black);\n  transition: all 1s ease-in-out;\n"])),(function(n){return n.openEdit?"0%":"-30%"}),(function(n){return n.openEdit?"100%":"0%"})),F=A.ZP.input(r||(r=(0,S.Z)(["\n  width: 100%;\n  height: 50px;\n  background-color: var(--gray);\n  border: none;\n  border-radius: 10px;\n  margin-top: 3%;\n  padding: 0% 5%;\n  color: var(--white);\n  &.nickName {\n    width: 70%;\n    margin-right: 3%;\n  }\n"]))),R=A.ZP.div(o||(o=(0,S.Z)(["\n  width: 30%;\n  height: 50px;\n  border-radius: 10px;\n  padding: 0% 5%;\n  margin-top: 3%;\n  background-color: var(--primary);\n  font-size: 14px;\n  font-weight: 600;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),V=A.ZP.select(s||(s=(0,S.Z)(["\n  font-size: 16px;\n  width: 100%;\n  height: 50px;\n  background-color: var(--gray);\n  border: none;\n  border-radius: 10px;\n  margin-top: 3%;\n  padding: 0% 5%;\n  color: var(--white);\n"]))),q=A.ZP.option(a||(a=(0,S.Z)(["\n  height: 30px;\n"]))),J=A.ZP.div(c||(c=(0,S.Z)(["\n  width: 100%;\n  height: 50px;\n  background-color: var(--gray);\n  color: var(--white);\n  border: none;\n  border-radius: 10px;\n  margin-top: 3%;\n  padding: 0% 5%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  &.nickName {\n    background-color: transparent;\n    padding: 0%;\n  }\n  :hover {\n    cursor: pointer;\n  }\n"]))),K=A.ZP.div(d||(d=(0,S.Z)(["\n  color: #7a7a7a;\n  font-size: 16px;\n  width: 100%;\n  margin-top: 6%;\n  padding: 0% 5%;\n  &.info {\n    font-size: 14px;\n    margin-top: 2%;\n  }\n"]))),L=A.ZP.div(l||(l=(0,S.Z)(["\n  width: 15%;\n  height: 60%;\n  border-radius: 30px;\n  background-color: ",";\n  display: flex;\n  transition: all 1s;\n  justify-content: ",";\n  align-items: center;\n  padding: 0% 1%;\n  .circleBtn {\n    width: 25px;\n    height: 25px;\n    border-radius: 50%;\n    background-color: var(--white);\n  }\n"])),(function(n){return n.open?"#c72363":"#5c5c5c"}),(function(n){return n.open?"flex-end":"flex-start"})),Q=(A.ZP.div(u||(u=(0,S.Z)(["\n  display: inline-block;\n  border: 7px solid transparent;\n  border-top-color: var(--white);\n  transform: rotate(90deg);\n  &.left {\n    transform: rotate(270deg);\n  }\n  &.open {\n    margin-top: 7px;\n    transform: rotate(0deg);\n  }\n  &.head {\n    border-top-color: white;\n  }\n"]))),function(n){var e=n.initialUser,t=(n.setOpenEdit,n.openEdit),i=n.user,r=n.setUser,o=n.onChange,s=n.setDupNickName,a=(0,N.useState)("H"==i.visible),c=(0,U.Z)(a,2),d=c[0],l=c[1],u=(0,N.useState)(!1),p=(0,U.Z)(u,2),x=p[0],f=p[1],h=(0,N.useState)(),v=(0,U.Z)(h,2),g=v[0],m=v[1];console.log(e);var Z=function(){var n=(0,C.Z)((0,P.Z)().mark((function n(e){var t,i;return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,z.BG.editUser({visible:e});case 3:t=n.sent,i=t.data,console.log(i.findUserData),r(i.findUserData),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),console.log(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}(),k=function(){var n=(0,C.Z)((0,P.Z)().mark((function n(){var t,r;return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(f(!0),i.nickName!==e.nickName){n.next=6;break}s(!0),m("\uc774\ubbf8 \ubcf8\uc778 \ub2c9\ub124\uc784\uc785\ub2c8\ub2e4"),n.next=20;break;case 6:return n.prev=6,n.next=9,z.D8.DupNick({nickName:i.nickName});case 9:t=n.sent,r=t.data,console.log(r.findDupNick),m(r.findDupNick),s(!0),n.next=20;break;case 16:n.prev=16,n.t0=n.catch(6),console.log(n.t0.response.data.message),m(n.t0.response.data.message);case 20:case"end":return n.stop()}}),n,null,[[6,16]])})));return function(){return n.apply(this,arguments)}}(),b=(0,N.useRef)(null),j={onComplete:function(n){r((0,B.Z)((0,B.Z)({},i),{},{myPlace:n.address.split(" ").slice(0,2)})),b.current.style.display="none"}},w=(0,M.Z)(j);return(0,H.jsxs)(_,{openEdit:t,children:[x&&(0,H.jsx)(G.Z,{setAlert:f,content:g}),(0,H.jsx)(K,{children:"\ub2c9\ub124\uc784"}),(0,H.jsxs)(J,{className:"nickName\r ",children:[" ",(0,H.jsx)(F,{className:"nickName",value:i.nickName,name:"nickName",onChange:o}),(0,H.jsx)(R,{onClick:k,children:"\uc911\ubcf5\ud655\uc778"})]}),(0,H.jsx)(K,{children:"\ube44\uacf5\uac1c \uc124\uc815"}),(0,H.jsxs)(J,{children:[(0,H.jsx)("div",{children:" \ub098\uc774, \uc131\ubcc4, \uc9c0\uc5ed"}),(0,H.jsx)(L,{open:d,children:(0,H.jsx)("div",{onClick:function(){return l(!d),Z(d?"V":"H")},className:"circleBtn"})})]}),(0,H.jsx)(K,{className:"info",children:"\uc571\uc5d0\uc11c \ub2e4\ub978 \uc0ac\uc6a9\uc790\uc5d0\uac8c \ub098\uc758 \ub098\uc774, \uc131\ubcc4, \uc9c0\uc5ed \uc815\ubcf4\ub97c \ube44\uacf5\uac1c\uc124\uc815\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."}),(0,H.jsx)(K,{children:"\ub098\uc774"}),(0,H.jsx)(F,{value:i.age,name:"age",onChange:o,type:"selectbox"}),(0,H.jsx)(K,{children:"\uc131\ubcc4"}),(0,H.jsxs)(V,{value:i.gender,name:"gender",onChange:o,children:[(0,H.jsx)(q,{value:"\uc5ec\uc790",children:"\uc5ec\uc790"}),(0,H.jsx)(q,{value:"\ub0a8\uc790",children:"\ub0a8\uc790"})]}),(0,H.jsx)(K,{children:"\uc9c0\uc5ed"}),(0,H.jsxs)(J,{onClick:w,children:[" ",i.myPlace[0]," ",i.myPlace[1]]}),(0,H.jsx)("div",{ref:b})]})}),W=t(2373),X=A.ZP.div(p||(p=(0,S.Z)(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  background-color: var(--white);\n  overflow-y: hidden;\n"]))),Y=A.ZP.div(x||(x=(0,S.Z)(["\n  position: sticky;\n  top: 0;\n  width: 100%;\n  background-color: var(--black);\n  box-shadow: 0px 0.5px 15px 0.1px black;\n  z-index: 100;\n  color: white;\n  padding: 3.5% 4% 3.5% 3%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  .headtxt {\n    font-size: 20px;\n    font-weight: 600;\n    color: #fff;\n    text-shadow: 0 0 7px #d90368, 0 0 10px #d90368, 0 0 21px #fff,\n      0 0 42px #d90368, 0 0 82px #d90368, 0 0 92px #d90368, 0 0 102px #d90368,\n      0 0 151px #d90368;\n  }\n  .closeBtn {\n    :hover {\n      cursor: pointer;\n    }\n    margin-left: 2.8%;\n  }\n  .gap {\n    width: 30px;\n    margin-left: 2%;\n  }\n"]))),$=A.ZP.div(f||(f=(0,S.Z)(["\n  display: flex;\n  :hover {\n    cursor: pointer;\n  }\n"]))),nn=A.ZP.div(h||(h=(0,S.Z)(["\n  z-index: 10;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: var(--black);\n  color: #d3d3d3;\n  border-top-left-radius: 20px;\n  border-top-right-radius: 20px;\n  height: 56%;\n  padding-top: 5%;\n  padding-left: 10%;\n  padding-bottom: 15%;\n  padding: 5% 10% 15% 10%;\n  overflow-y: hidden;\n  overflow-y: scroll;\n  //? -----\ubaa8\ubc14\uc77c\uc5d0\uc11c\ucc98\ub7fc \uc2a4\ud06c\ub864\ubc14 \ub514\uc790\uc778---------------\n  ::-webkit-scrollbar {\n    width: 15px;\n  }\n  ::-webkit-scrollbar-thumb {\n    background-color: #898989;\n    //\uc2a4\ud06c\ub864\ubc14\uc5d0 \ub9c8\uc9c4\uc900\uac83\ucc98\ub7fc \ubcf4\uc774\uac8c\n    background-clip: padding-box;\n    border: 4px solid transparent;\n    border-radius: 15px;\n  }\n"]))),en=A.ZP.div(v||(v=(0,S.Z)(["\n  margin-top: 2%;\n  width: 100%;\n  padding: 0px 10px;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  &.Topbox {\n    justify-content: space-between;\n  }\n  .visible {\n    justify-content: space-between;\n    display: flex;\n    align-items: center;\n    margin-left: 3%;\n  }\n"]))),tn=A.ZP.div(g||(g=(0,S.Z)(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  gap: 10px;\n"]))),rn=A.ZP.div(m||(m=(0,S.Z)(["\n  display: flex;\n  justify-content: left;\n  gap: 15px;\n"]))),on=A.ZP.div(Z||(Z=(0,S.Z)(["\n  padding: 5px 15px;\n  font-size: 14px;\n  border-radius: 30px;\n  background-color: var(--primary);\n"]))),sn=A.ZP.div(k||(k=(0,S.Z)(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  margin-top: 5%;\n"]))),an=A.ZP.div(b||(b=(0,S.Z)(["\n  color: #dadada;\n  display: flex;\n  align-items: center;\n  margin-top: 10%;\n  :hover {\n    cursor: pointer;\n    text-decoration: underline;\n  }\n"]))),cn=A.ZP.div(j||(j=(0,S.Z)(["\n  margin-top: 5%;\n  display: flex;\n  flex-direction: column;\n  width: 90%;\n  max-height: 50%;\n  .fontweight {\n    font-weight: 600;\n  }\n"]))),dn=A.ZP.div(w||(w=(0,S.Z)(["\n  margin-top: 15%;\n  color: #6c6c6c;\n  font-size: 15px;\n  font-weight: 600;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  @media only screen and (max-width: 400px) {\n    font-size: 11px;\n  }\n\n  :hover {\n    cursor: pointer;\n  }\n  .txtbox {\n    padding: 0px 20px;\n    border-right: 1px solid #6c6c6c;\n    :hover {\n      text-decoration: underline;\n    }\n  }\n  .txtbox-noborder {\n    padding: 0px 20px;\n    :hover {\n      text-decoration: underline;\n    }\n  }\n"]))),ln=A.ZP.div(y||(y=(0,S.Z)(["\n  display: inline-block;\n  border: 7px solid transparent;\n  border-top-color: var(--white);\n  transform: rotate(90deg);\n  margin-left: 5%;\n  &.left {\n    transform: rotate(270deg);\n  }\n  &.open {\n    margin-top: 7px;\n    transform: rotate(0deg);\n  }\n  &.head {\n    margin-left: 0;\n    border-top-color: white;\n  }\n"]))),un=function(){var n=(0,D.Z)(),e=(0,U.Z)(n,3),t=e[0],i=e[1],r=e[2],o=(0,N.useState)(!1),s=(0,U.Z)(o,2),a=s[0],c=s[1],d=(0,N.useState)(!1),l=(0,U.Z)(d,2),u=l[0],p=l[1],x=(0,N.useState)(!1),f=(0,U.Z)(x,2),h=f[0],v=f[1],g=(0,N.useState)(),m=(0,U.Z)(g,2),Z=m[0],k=m[1],b=(0,N.useState)(),j=(0,U.Z)(b,2),w=j[0],y=j[1],S=(0,N.useState)([]),A=(0,U.Z)(S,2),B=A[0],M=A[1],_=(0,N.useState)(),F=(0,U.Z)(_,2),R=F[0],V=F[1],q=(0,N.useState)(!1),J=(0,U.Z)(q,2),K=J[0],L=J[1],un=(0,N.useState)(!0),pn=(0,U.Z)(un,2),xn=pn[0],fn=pn[1],hn=(0,N.useState)(!1),vn=(0,U.Z)(hn,2),gn=vn[0],mn=vn[1],Zn=(0,N.useState)(),kn=(0,U.Z)(Zn,2),bn=kn[0],jn=kn[1],wn=(0,N.useState)(),yn=(0,U.Z)(wn,2),Nn=yn[0],Sn=yn[1],Pn=(0,N.useState)(),Cn=(0,U.Z)(Pn,2),Un=Cn[0],zn=Cn[1],An=(0,N.useState)(!1),Dn=(0,U.Z)(An,2),In=Dn[0],En=Dn[1],Tn=(0,N.useState)(),On=(0,U.Z)(Tn,2),Bn=On[0],Mn=On[1],Gn=(0,N.useState)(!1),Hn=(0,U.Z)(Gn,2),_n=(Hn[0],Hn[1]),Fn=(0,N.useState)(),Rn=(0,U.Z)(Fn,2),Vn=Rn[0],qn=Rn[1],Jn=(0,N.useState)(),Kn=(0,U.Z)(Jn,2),Ln=Kn[0],Qn=Kn[1],Wn=(0,N.useState)(),Xn=(0,U.Z)(Wn,2),Yn=Xn[0],$n=Xn[1],ne=(0,N.useState)(),ee=(0,U.Z)(ne,2),te=ee[0];ee[1];(0,N.useEffect)((function(){ie()}),[zn,Un]);var ie=function(){var n=(0,C.Z)((0,P.Z)().mark((function n(){var e,t;return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,z.BG.getUser();case 3:e=n.sent,t=e.data,console.log(t),Mn(t.findUser),V(t.findUser.likeGame),i(t.findUser),k(t.partyReserved),y(t.partyGo),M(t.findUser.bookmarkData),setTimeout((function(){return fn(!1)}),700),n.next=19;break;case 15:n.prev=15,n.t0=n.catch(0),sessionStorage.getItem("accessToken")||(mn(!0),jn("\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud55c \ud398\uc774\uc9c0\uc785\ub2c8\ub2e4!")),console.log(n.t0);case 19:case"end":return n.stop()}}),n,null,[[0,15]])})));return function(){return n.apply(this,arguments)}}(),re=function(){var n=(0,C.Z)((0,P.Z)().mark((function n(){var e,r;return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t.nickName.trim(" ")||t.nickName===Bn.nickName){n.next=13;break}return n.prev=1,n.next=4,z.BG.editUser(t);case 4:e=n.sent,r=e.data,console.log(r.findUserData),i(r.findUserData),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(1),console.log(n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})));return function(){return n.apply(this,arguments)}}(),oe=function(){var n=(0,C.Z)((0,P.Z)().mark((function n(){var e,t;return(0,P.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,I.ZP.delete("".concat("https://www.iceflower.shop","/users"),{headers:{Authorization:"".concat(sessionStorage.getItem("accessToken"))}});case 3:e=n.sent,t=e.data,console.log(t),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),console.log(n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(){return n.apply(this,arguments)}}();(0,N.useEffect)((function(){sessionStorage.getItem("accessToken")||(mn(!0),jn("\ub85c\uadf8\uc778\uc774 \ud544\uc694\ud55c \ud398\uc774\uc9c0\uc785\ub2c8\ub2e4!"),Sn("/"))}),[]),console.log((null===t||void 0===t?void 0:t.nickName)===(null===Bn||void 0===Bn?void 0:Bn.nickName));return xn?(0,H.jsxs)(H.Fragment,{children:[gn&&(0,H.jsx)(G.Z,{setAlert:mn,content:bn,confirm:!0,confirmAddress:"/",confirmContent:"\ub85c\uadf8\uc778",cancelContent:"\ucde8\uc18c",cancelAddress:-1}),(0,H.jsx)(O.Z,{})]}):(0,H.jsxs)(X,{children:[gn&&(0,H.jsx)(G.Z,{confirmFunction:function(){"\ud0c8\ud1f4"===Ln&&oe(),sessionStorage.removeItem("accessToken"),sessionStorage.removeItem("refreshToken"),sessionStorage.removeItem("nickName")},setConfirmAlert:_n,setAlert:mn,address:Nn,confirm:!0,confirmAddress:Vn,confirmContent:Ln,cancelContent:Yn,cancelAddress:te,content:bn}),(0,H.jsxs)(Y,{children:[K?(0,H.jsx)(W.o,{size:"26",onClick:function(){L(!K),i(Bn)},className:"closeBtn"}):(0,H.jsx)("div",{className:"gap"}),(0,H.jsx)("div",{className:"headtxt",children:"\ub9c8\uc774\ud398\uc774\uc9c0"}),(0,H.jsx)($,{children:(0,H.jsx)("div",{onClick:K?function(){t.nickName===Bn.nickName||In?(sessionStorage.setItem("nickName",t.nickName),re(),L(!1)):(mn(!0),jn("\uc911\ubcf5\ud655\uc778\uc744 \ub20c\ub7ec\uc8fc\uc138\uc694!"))}:function(){return L(!0)},children:K?"\uc644\ub8cc":"\ud3b8\uc9d1"})})]}),(0,H.jsx)(T.Z,{userSelect:null===t||void 0===t?void 0:t.userAvatar}),(0,H.jsxs)(nn,{children:[" ",(0,H.jsxs)(en,{className:"Topbox",children:[" ",(0,H.jsxs)("div",{children:[null===t||void 0===t?void 0:t.nickName," \ub2d8"]})," "]}),"V"==(null===t||void 0===t?void 0:t.visible)&&(0,H.jsxs)(en,{children:[(0,H.jsxs)("div",{children:[null!==t&&void 0!==t&&t.age?"".concat(null===t||void 0===t?void 0:t.age," \uc0b4"):"\uc5c6\uc74c"," /"]}),(0,H.jsxs)("div",{children:[null!==t&&void 0!==t&&t.gender?"".concat(null===t||void 0===t?void 0:t.gender):"\uc5c6\uc74c"," /"]}),(0,H.jsxs)("div",{children:[" ",null!==t&&void 0!==t&&t.myPlace.length?"".concat(null===t||void 0===t?void 0:t.myPlace[0]," ").concat(null===t||void 0===t?void 0:t.myPlace[1]):"\uc5c6\uc74c"]})]}),"H"==(null===t||void 0===t?void 0:t.visible)&&(0,H.jsx)("div",{children:"\ube44\uacf5\uac1c"}),(0,H.jsx)(tn,{children:(0,H.jsx)(rn,{children:null===R||void 0===R?void 0:R.map((function(n){if(R.length>=2)return(0,H.jsx)(on,{children:n})}))})}),(0,H.jsxs)(sn,{children:[(0,H.jsxs)(an,{onClick:function(){return c(!a)},children:["\ub0b4\uac00 \ucc1c\ud55c \ubaa8\uc784",(0,H.jsx)(ln,{className:a?"open":null})]}),a&&(0,H.jsxs)(cn,{children:[0===(null===B||void 0===B?void 0:B.length)&&(0,H.jsx)("div",{className:"fontweight",children:"\ube44\uc5b4\uc788\uc2b5\ub2c8\ub2e4."}),null===B||void 0===B?void 0:B.map((function(n){return(0,H.jsx)(E.Z,{setModalOpen:zn,ModalOpen:Un,party:n,title:n.title,postId:n.postId})}))]}),(0,H.jsxs)(an,{onClick:function(){return p(!u)},children:["\ucc38\uc5ec \uc2e0\uccad \uc911\uc778 \ubaa8\uc784",(0,H.jsx)(ln,{className:u?"open":null})]}),u&&(0,H.jsxs)(cn,{children:[0===(null===Z||void 0===Z?void 0:Z.length)&&(0,H.jsx)("div",{className:"fontweight",children:"\ube44\uc5b4\uc788\uc2b5\ub2c8\ub2e4."}),null===Z||void 0===Z?void 0:Z.map((function(n){return(0,H.jsx)(E.Z,{setModalOpen:zn,ModalOpen:Un,party:n,title:n.title,postId:n._id})}))]}),(0,H.jsxs)(an,{onClick:function(){return v(!h)},children:["\ucc38\uc5ec \ud655\uc815 \ubaa8\uc784",(0,H.jsx)(ln,{className:h?"open":null})]}),h&&(0,H.jsxs)(cn,{children:[0===(null===w||void 0===w?void 0:w.length)&&(0,H.jsx)("div",{className:"fontweight",children:"\ube44\uc5b4\uc788\uc2b5\ub2c8\ub2e4."}),null===w||void 0===w?void 0:w.map((function(n){return(0,H.jsx)(E.Z,{setModalOpen:zn,ModalOpen:Un,party:n,title:n.title,postId:n._id})}))]})," "]})," ",(0,H.jsxs)(dn,{children:[(0,H.jsx)("div",{className:"txtbox",onClick:function(){return mn(!0),jn("\ub85c\uadf8\uc544\uc6c3 \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"),Qn("\ub85c\uadf8\uc544\uc6c3"),$n("\ucde8\uc18c"),void qn("/")},children:"\ub85c\uadf8\uc544\uc6c3"}),(0,H.jsx)("div",{className:"txtbox",onClick:function(){return mn(!0),jn("\ud68c\uc6d0 \ud0c8\ud1f4\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"),Qn("\ud0c8\ud1f4"),$n("\ucde8\uc18c"),void qn("/")},children:"\ud68c\uc6d0\ud0c8\ud1f4"}),(0,H.jsx)("div",{className:"txtbox-noborder",onClick:function(){return window.open("https://forms.gle/83os3kHzPNmC22fTA","_blank")},children:"\uace0\uac1d\ubb38\uc758"})," "]})]})," ",(0,H.jsx)(Q,{initialUser:Bn,setDupNickName:En,user:t,onChange:r,setUser:i,openEdit:K,setOpenEdit:L})]})},pn=t(2030),xn=t(8688),fn=function(){return(0,H.jsx)("div",{children:(0,H.jsxs)(pn.Z,{children:[(0,H.jsx)(xn.Z,{}),(0,H.jsx)(un,{})]})})}}}]);
//# sourceMappingURL=655.586fbd28.chunk.js.map