<template>
  <div
      id="demo"
      :class="[{'collapsed' : collapsed}, {'onmobile' : isOnMobile}]"
  >
    <div class="demo p-0">
      <div class="container-fluid">
        <div v-if="$store.state.error.show" class="alert alert-danger alert-dismissible fade show" role="alert">
          {{ $store.state.error.text }}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <router-view/>
      </div>
      <sidebar-menu
          :menu="menu"
          :collapsed="collapsed"
          :theme="selectedTheme"
          :show-one-child="true"
          @toggle-collapse="onToggleCollapse"
          @item-click="onItemClick"
      ><span slot="toggle-icon"><i class="fa fa-bars fa-2x"></i></span>
      </sidebar-menu>
      <div
          v-if="isOnMobile && !collapsed"
          class="sidebar-overlay"
          @click="collapsed = true"
      />
      <snackbar
          ref="snackbar"
          baseSize="150px"
          :wrapClass="''"
          :colors="snackColors"
          :holdTime="3000"
          :multiple="true"
          position="bottom-right"
      />
    </div>
  </div>
</template>

<script>
import Snackbar from 'vuejs-snackbar';
import EventBus, {ACTIONS} from './eventBus';
import {showSnackbar} from './globalActions';
// import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      snackColors: {open: '#333', info: '#3DBD7D', error: '#FA7377', warn: '#FF6600'},
      snackbar: false,
      snackbarMessage: '',
      menu: [
        {
          header: true,
          title: 'Title',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Home',
          icon: 'fa fa-list'
        }, {
          href: '/chart',
          title: 'Chart',
          icon: 'fa fa-chart-line'
        }, {
          href: '/about',
          title: 'About',
          icon: 'fa fa-info'
        },

        // {
        //   href: "/page",
        //   title: "Dropdown Page",
        //   icon: "fa fa-list-ul",
        //   child: [
        //     {
        //       href: "/page/sub-page-1",
        //       title: "Sub Page 01",
        //       icon: "fa fa-file-alt"
        //     },
        //     {
        //       href: "/page/sub-page-2",
        //       title: "Sub Page 02",
        //       icon: "fa fa-file-alt"
        //     }
        //   ]
        // }
      ],
      menuRelative: false,
      collapsed: true,
      selectedTheme: 'white-theme',
      dailyData: [],
      isOnMobile: false,
    };
  },
  created() {
    setTimeout(function () {
      showSnackbar('Welcome');
    }, 5000);
  },
  components: {Snackbar},
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
    EventBus.$on(ACTIONS.SNACKBAR, (message) => {
      this.$refs.snackbar.open(message);
    });
    // axios
    //   .get('data/daily.json')
    //   .then(response => (this.dailyData = response));
  },
  computed: {},
  methods: {
    onToggleCollapse(collapsed) {
      console.log('collapsed', collapsed);
      this.collapsed = collapsed;
    },
    onItemClick(event, item, node) {
      console.log('onItemClick', event, item, node);
      // console.log(event)
      // console.log(item)
      // console.log(node)
    },
    onResize() {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true;
        this.collapsed = true;
      } else {
        this.isOnMobile = false;
        this.collapsed = false;
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  background-color: #f2f4f7;
  color: #262626;
}

#demo {
  padding-left: 350px;
  transition: 0.3s ease;
}

#demo.collapsed {
  padding-left: 50px;
}

#demo.onmobile {
  padding-left: 50px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}

.demo {
  padding: 50px;
}

.container {
  max-width: 900px;
}

pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>
