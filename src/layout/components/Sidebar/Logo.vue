<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '网站系统管理平台',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAAC0CAYAAAA0JqZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRjZBQkEyRDZERjUxMUVBOUY5Q0FCNEY1QzZDRkM4MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRjZBQkEyRTZERjUxMUVBOUY5Q0FCNEY1QzZDRkM4MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJGNkFCQTJCNkRGNTExRUE5RjlDQUI0RjVDNkNGQzgyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJGNkFCQTJDNkRGNTExRUE5RjlDQUI0RjVDNkNGQzgyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kBuyzgAADlNJREFUeNrsXQGMVcUVHX42hBCyUmoIIZuNpRRLq4RSSog1hDbUNlapUqtWoVLAKgIioLarLhvYUgQEXAnqEkAKSCyCUKCmNtYSQgghliIhRREpbAihhGxws6EbSnZ7T/5ss1n3787Mf/+9mffOSW7eBmb+f+/O+fPunblzb6+2tjZFEKEiRxUQJDBBkMAEQQITJDBBkMAEQQITBAlMkMAEQQITBAlMECQwQQITBAlMEEWjLO4vPJmrHCiXMSLfEblJS4VIf5G+In04LN7gisglkQsip0U+ETkhcmR4a0OjDzfYq9TxwEJY/EgmiNyrr0PIi1TglMifRfaK7BdCX08VgYW4g+QyR2SGyECOd6qBWXq9SL0QuSFoAgtxy+WySORxmgOZQ6vIJpEqIfKl4Jw4Ie9EuXwq8hTJm9lFgWkinwkXZgQzA8vN4sZXauISRDu2iTwqs/FVb2dgIW9vuewkeYku8JDIe8KRfj6bEG+I3MOxIgrgdqxU6InOLwLLTf1G/8oIojuMF9ngFYGFvCPlUsuxIQwxuRSOnZMTpzcn/i4yosjvP67yOztnVH4JJgp8HuFnhYgvOfTBeHZnp96o8jumo0WKMQWaRYaLU3c+qod13UqeXwR5sYNTJ/KOPMhFTkzhQCYuLI3+SGSmyB0OH4EfyVKRKYnNwPIQiFk4J1Ju+V2XRRaIbBXitpIOwZP5NrnUi9xi2RVj/1XhwNmkbOAZDuTdr18dm0nedEDG8ZBcvi2y0YFz85J04h6zbP+WyA/lgS9z2FNH4msi0+XPFy27To1qWc2KwPKleF0MteiCaKWH8aAc7lQTucpyJi53tKGLnoEnWNq8U2gyZAazVH5FyRQ/TYLAP7Bou4BmQ6Zm4Ra9OmGKcUkQ2HTpDB7mVg5r5kh8UC5/MWw+RMeMx0NgHZBRYdi8nqZDZrHWou2oOGfgYRZt93EcMws47i0l4FTRBDY9FtQks+8JjmNmzQisOB02bH5znAS+0bDdcQ5j5nHKsN2gOAk8wLDdeY5f5nHFRwKbtuXSGWFqA5fHSWDTMD2uPhCm6BcngQkiapT5SOCrHBci5BmYJgQRG3I+/qoIgjYwQSO6E/4hsseg3UdUK+EdgYe3NuyWy26qjKAJQRAkMEGQwAQJTBABOHEnc5VIn2oSD7FXHL4P06gs0cGTcvmyQdNdooNjBT4DEVgmZ8f+K7KqlLl1M0VglU9GUWnQ7n4ZpFuTKvpRQvIi+3ydYfN/iRwr8H8g8ELDz/mWiuj0Lk0Ic3xdpSzZtc4JVhfRx7VYtJ0k372QNI3fBq4RxQ9OkZ6eVfnsjHETGFgkupxEqsZL4H4RzlhJz74gblXCt7FF7mME6RrvKsR9ovQJKdDRGpV8xSVUMN2rq5wSMREYWFuq2ggxzb7IhXuXJ7cDB3pnyPoMkcA49z8/UPL21rOvT0DBlLWkbXwEBqqFDBUB6uZpZZeJMy7MEH3OJnXjI3Df0Bw6IQhe19Ue32Kd3OP3Sd/4tpInaXsyFKxUfpfKzWl7eCgJHKM3H4IDoldO7gtg7PrrlYlyEjgeDNV2pe+OW0hOEnY939S1qkngmBy6So/1gS3wYYGNIZb5lnp2T5+nlcCwK9f4yAK99V2twsSzcv8+lfxtTSuBgYmi7Ds9JMFqFXZKgA2i19E0IeJz6Lzx8uVexsvl/sDHEvr8YxRp+0ngnjFE5SO8fCBvmUrP7hbMoF1Z2m5O0nut0pFeSQOnLL7h6fhccugzVuQ1EjieV16iM59+3S7yeHxQe63Bod+0rGw3J71+eKc+qpMUVnjuuCFZ+N3KLeNnnbbtSeASoy4Jh06+E5Fdk30foOGtDag5MsVxbHd6YqYFReAdIs0W7aHg5wNw3N5KkMTvyGWxQ1fUNdmra/yRwIa4ILLEsg8W4ofE+NxPKPOqo+3O1JIkB0pIXKPcctOhQPvvSWA7rFLmpZYALPvEEnKpj+XYOm6/tnyrlAowJVxq8KX2dHOuRLMFit3Ntex2V0whl8tUPpLLFEdFNntiDzdrp67RoTtON99DApsrGyVH91h2K2nIpXw21kinWnabo+s+N3lC4rMqn+zEJXEMTjffQgKbA7OwTR4EhFw+VSLy5lwcNyHMIf23TYBKU4lJvN/hDQfAmcN28wAS2Hy2eMmyW3WJkqL8StlVR2/Rtq8LSh6NJbp9VS7rHLrCWX47LTHEcTwEvPcGy1liRcSz7wCHVYTlQpIGz8dvjshBh344T7eaBDabKTCTzbPs9pCQ7rYIbwMB3zavzQva2SsFWiPU7TVtD7v80J4UHU8lgc0UjYX49y27rY3iNSefMUqbDzZ4poRpTZsi1i3WqH+i3Lab60U/Y0hg89edjec80oF4Xf4QLNsfFlJs6+Lfm30dRJ2L+BGHrr21UzeYBO5ZyR/L5WVb+7kYj1m/IsdadptZ4P69zncs94ct/N85dEVE3i6fDhiUisBRvFKxA3bRoj3IW+tI3nIHO3ZdoczqIUDuHTElexy6woyoTzuBr0WgYLyGF1h2e9wxtShWHWyyOV5RyadRjQIPi/zTod8vdBkJmhA9kBj25SHLe7Q6yax3m56wvLUqubfG0Nlb5HbzytBS4ia1mA0702Y5aZwo9kFLx83m2WA2rFMpgZD4jFx+puyX7KCzt2OODPSOwM0GCkaQ9usOs0Nfg9kX+RHG2f6gdLyDShGJP1D26+9Ae8qqflklsKm3Xm35musx8YhWuu0u3mYZ7MMqhZDnekUuGx264pDrmzQhulduo4PTNL+H11uNJropsKnwjEo3Zlr6HO1AAppaErh7rFf5eFtTFAx8F2W7lPdapHeyUgu93XyvyHmH7i/4XiEpl7ByYXfOsuxWKPAdKxU2hRux1PSKygA6bDe3OHT3ukJSzgPlwv7cZNmtrmPgu/yNfL62yz9z0lZNtAc94033S4eucJy9jSH2JSYUcbdXLNoPazcX9MrESsvv26699ExBnhknq1906HqTyh/RLyOBC7/ibI/WV+vMOuhnk3MYy3zzVHYBfe1z6DdeeRhD7FNUPtaFbeIQsGS2RdlnfYfjdiGr7NV+B7abP3boPlsmjWkkcGHFzrTsNkGvTJjCJSIuavT2QNdYPrzb0mxrR70+HEsCR+TQhea49fVE16fl8nNlv91cpp26ChK4sENXilO9O2TQ3ldERxIj9YFLBB6i/LyIIc55qFQ4dFHXqriaccetO30vV25531DOYAMJ3DVwZPx4hJ9XKwN1nnQtiOnKbke0HTh8+zQJ/MVZAXbqrIg+DjnaVpGj3eobbyhsN7tsqy8TEt9BAn9Rqch3sDWCj5qr4wGI7vWNo/mIIb7uwKE/JFX21vfsLAuKdOh2a0eFMCPxAeWWsqpz2dscCVy8Q9fiOBhZJzH8j/UOXTuWvb2BBC7eoatNMDVUWeA8hv/hEuSPsrexxhDnApgRXBw6LNK/lOBtB53Sv0MMscuW+3OayCRwJ4duGx23WHWO/B2IIXbR4ygSuGuHziS90z5R/rukYCQk/lAuj/p8j7nAZoQaA8dtDqkXqd5RXuFlEjga4AhQd1lnluqk2j4jxBxkePt9QAJH49AVCrlEMo/lATxGcATWoa7Y5DhLAhevzAMFHLq5Opk2URq9Nyr3PMQkcCfAsfhKB/maKHgfaVZyEmM9/hGf7slmwb2/R4q86uPrLCMk3nEyV/lb+fMFzsBEqMBq0D4SmAh1Fi7mYCgJHDj6p4TETdqpayKBiVBJjMMCLgdDSWDCGxJj2/55EpgImcRIV7WdBCZCBhIHHieBiVBnYazNI9vPZRI43eiTYhK7Hgx1Rhn5ZIXFhu26e5UiO9ADKn/iAefIcBAScc4IF0XuCpyC+LeeXE4HSOL9J3OVWCP+rkHzosv39mprazNqKDd1TpmlMV0sD1FDrhM0IQgiAQL3pVqJkAncm2olaEIQhAG4CkFEDnH4R8plZDdN/p8ZXhz+3SQw4RuwRLjQsG0vmhAEbWCCiBD/8ZHA1zkuhCFMT4c3xUngZo4LEbIJwRmYiBrNcRL4CvVNGMI04i5WE6LRsB23kokbIuZUJAQ2DVQewPHLPCoi5lQkBD5n2G4kxy/zGGbYriFOAp8ybDfkZK5yIMcwm9DlZ00ztH/qI4GBBzmUmQWKHpqGKJyJk8BILG2aWnO6LrdEZA/TLdoejY3AOh/WEcPmIzgLZ9J8wLhPNGx+Vjh1ITYCa/zVou2yDpUbifSTF2bDGxZdDkbxvbYEtondrLB8ICJs1Ci78lp/ip3AMuWfsHTmJskvcw3HNvWz71Rll/AawT7vxk5gjdcs28+WB9yil1eIdBE3J/Kcw5t2u07PmgiBUQja9ssni3wkDzuBw54a8mLD6m8iSxy6r4jqPowTm3S6+VrlXiPhkJ7Fd8uvkCGaYZEWJ86xzvuYcq+HjNn3gaQJjICdT5T5nndXQHgmSpkeE/lM5VMrgdCtnWZ4rD2noe5xiJnZ++gxRiWoMSJjVXGFzDGW34yyGKUTgTWJYQ68p3gsiTDHTCHv61F+oDP55EaQpI450AhTbI2avEURWJMY9cI2cmyIHoBNi+ml+OAoXv+omrmNY0QUAMIPfiyT3TUvCaxjJKaIrONYEZ2AndvvRbXmG6kTV8CxmyqXtYrHirIOzLZVQtxVpf6iSFcQ5IY34UKTItPAFvGtcZA38hm402yMdcMFIpMUc7ClHTAjUWZrtRD3SJxfXDICdyDyYJWPDUZZ0tsV143TAmxEHRDZJbJDiHsxiZsoOYE7kRm7OAi5Gy1ys8rv8gzSM3R/csJLYHcUO2gIPkcRGuzAYgf1qJC2Jembi5XABOG1E0cQJDBBkMAECUwQJDBBkMAEQQITJDBBkMAEQQITBAlMkMAEQQITBAlMZBT/E2AA9mcZ6vV1xTkAAAAASUVORK5CYII='
    }
  }
}
// src="@/assets/logo.png"
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
