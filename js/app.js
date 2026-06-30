const markdown = markdownit({
  html: true,
  linkify: true,
  typographer: false
}).use(window.markdownitContainer, 'panel');

let count = 0;
markdown.renderer.rules.heading_open = function(tokens, idx) {
  const level = tokens[idx].tag;
  return `<${level} id="!content-${count++}">`;
};

const app = Vue.createApp({
	data() { 
		return {
		    isLoading: 0,
			html: '',
			navigation: [],
			date: new Date().getFullYear(),
			facebook: facebookAlt,
			instagram: instagramAlt,			
		}
	},
	created() {
		this.$root.showLoader();
	
		axios.get('/md/page.md')
		.then((response) => {
			this.$root.hideLoader();
			this.html = markdown.render(response.data);
			this.html = this.postRender(this.html);
			setTimeout(reveal, 1000);
		})
		.catch((error) => {
			this.$root.hideLoader();
		});

	},
	mounted() {
		window.addEventListener("scroll", reveal, {passive: true});
	},
	methods: {
	    showLoader() {
	    	this.isLoading += 1;
	    },
	   	hideLoader() {
	    	if(this.isLoading > 0) {
	    		this.isLoading -= 1;
	    	}
	    },
		postRender(html) {
			return html.replaceAll(/%%%\sfacebook\s%%%/g, facebook).replaceAll(/%%%\sinstagram\s%%%/g, instagram).replaceAll(/%%%\slinkedin\s%%%/g, linkedin).replaceAll(/%%%\s([\w\s]*)\s%%%/g, '<i class="small material-icons x-icon">$1</i>');
		},
	},	
});

app.mount('#app');