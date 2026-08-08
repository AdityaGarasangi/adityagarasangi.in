import { createHead } from "@unhead/vue/server";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createSSRApp, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, onUnmounted, openBlock, ref, renderList, resolveComponent, resolveDirective, resolveDynamicComponent, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { createMemoryHistory, createRouter, useRoute, useRouter } from "vue-router";
import { ssrGetDirectiveProps, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
import { useHead } from "@unhead/vue";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
//#region node_modules/vite-ssg/dist/shared/vite-ssg.ETIvV-80.mjs
var ClientOnly = defineComponent({ setup(props, { slots }) {
	const mounted = ref(false);
	onMounted(() => mounted.value = true);
	return () => {
		if (!mounted.value) return slots.placeholder && slots.placeholder({});
		return slots.default && slots.default({});
	};
} });
//#endregion
//#region node_modules/vite-ssg/dist/index.mjs
function ViteSSG(App, routerOptions, fn, options) {
	const { transformState, registerComponents = true, useHead = true, rootContainer = "#app" } = options ?? {};
	async function createApp$1(routePath) {
		const app = createSSRApp(App);
		let head;
		if (useHead) app.use(head = createHead());
		const router = createRouter({
			history: createMemoryHistory(routerOptions.base),
			...routerOptions
		});
		const { routes } = routerOptions;
		if (registerComponents) app.component("ClientOnly", ClientOnly);
		const appRenderCallbacks = [];
		const onSSRAppRendered = (cb) => appRenderCallbacks.push(cb);
		const triggerOnSSRAppRendered = () => {
			return Promise.all(appRenderCallbacks.map((cb) => cb()));
		};
		const context = {
			app,
			head,
			isClient: false,
			router,
			routes,
			onSSRAppRendered,
			triggerOnSSRAppRendered,
			initialState: {},
			transformState,
			routePath
		};
		await fn?.(context);
		app.use(router);
		let entryRoutePath;
		let isFirstRoute = true;
		router.beforeEach((to, from, next) => {
			if (isFirstRoute || entryRoutePath && entryRoutePath === to.path) {
				isFirstRoute = false;
				entryRoutePath = to.path;
				to.meta.state = context.initialState;
			}
			next();
		});
		{
			const route = context.routePath ?? "/";
			router.push(route);
			await router.isReady();
			context.initialState = router.currentRoute.value.meta.state || {};
		}
		const initialState = context.initialState;
		return {
			...context,
			initialState
		};
	}
	return createApp$1;
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/components/Navbar.vue
var _sfc_main$12 = {
	__name: "Navbar",
	__ssrInlineRender: true,
	setup(__props) {
		const isScrolled = ref(false);
		const isMenuOpen = ref(false);
		const currentSection = ref("home");
		const route = useRoute();
		useRouter();
		const closeMenu = () => {
			isMenuOpen.value = false;
		};
		const isRoute = (path) => {
			return route.path === path;
		};
		const handleScroll = () => {
			isScrolled.value = window.scrollY > 50;
			if (route.path !== "/") {
				currentSection.value = "";
				return;
			}
			const sections = [
				"home",
				"projects",
				"blogs"
			];
			let found = "home";
			for (let i = sections.length - 1; i >= 0; i--) {
				const section = document.getElementById(sections[i]);
				if (section) {
					if (window.scrollY >= section.offsetTop - 150) {
						found = sections[i];
						if (found === "projects" || found === "blogs") found = "home";
						break;
					}
				}
			}
			currentSection.value = found;
		};
		onMounted(() => {
			window.addEventListener("scroll", handleScroll, { passive: true });
			handleScroll();
		});
		onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll);
		});
		watch(() => route.path, () => {
			setTimeout(handleScroll, 100);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<nav${ssrRenderAttrs(mergeProps({ class: ["navbar", { "scrolled": isScrolled.value }] }, _attrs))} data-v-c36abaa3><div class="container navbar-content" data-v-c36abaa3><a href="/" class="logo" data-v-c36abaa3> AG<span class="text-accent" data-v-c36abaa3>.</span></a><button class="mobile-toggle" aria-label="Toggle Menu" data-v-c36abaa3><i class="${ssrRenderClass(isMenuOpen.value ? "fas fa-times" : "fas fa-bars")}" data-v-c36abaa3></i></button><div class="${ssrRenderClass(["nav-links", { "active": isMenuOpen.value }])}" data-v-c36abaa3>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/side-hustles",
				class: ["nav-item", { "active-link": isRoute("/side-hustles") }],
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Side Hustles`);
					else return [createTextVNode("Side Hustles")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/blogs",
				class: ["nav-item", { "active-link": isRoute("/blogs") }],
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Blogs`);
					else return [createTextVNode("Blogs")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/journey",
				class: ["nav-item", { "active-link": isRoute("/journey") }],
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Journey`);
					else return [createTextVNode("Journey")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/about",
				class: ["nav-item", { "active-link": isRoute("/about") }],
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`About`);
					else return [createTextVNode("About")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></nav>`);
		};
	}
};
var _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Navbar.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var Navbar_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$12, [["__scopeId", "data-v-c36abaa3"]]);
//#endregion
//#region src/components/Footer.vue
var _sfc_main$11 = {
	__name: "Footer",
	__ssrInlineRender: true,
	setup(__props) {
		const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "site-footer" }, _attrs))} data-v-1c6873d8><div class="container footer-inner" data-v-1c6873d8><div class="footer-top" data-v-1c6873d8><div class="footer-brand" data-v-1c6873d8>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/",
				class: "logo"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`AG<span class="dot" data-v-1c6873d8${_scopeId}>.</span>`);
					else return [createTextVNode("AG"), createVNode("span", { class: "dot" }, ".")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="footer-socials" data-v-1c6873d8><a href="https://github.com/adityagarasangi" target="_blank" rel="noopener" aria-label="GitHub" data-v-1c6873d8><i class="fab fa-github" data-v-1c6873d8></i></a><a href="https://www.linkedin.com/in/adityagarasangi/" target="_blank" rel="noopener" aria-label="LinkedIn" data-v-1c6873d8><i class="fab fa-linkedin-in" data-v-1c6873d8></i></a><a href="https://x.com/adityagarasangi" target="_blank" rel="noopener" aria-label="Twitter / X" data-v-1c6873d8><i class="fab fa-x-twitter" data-v-1c6873d8></i></a><a href="https://www.instagram.com/aditya._.garasangi/" target="_blank" rel="noopener" aria-label="Instagram" data-v-1c6873d8><i class="fab fa-instagram" data-v-1c6873d8></i></a></div></div><div class="footer-bottom" data-v-1c6873d8><span class="copyright" data-v-1c6873d8>© ${ssrInterpolate(unref(currentYear))} Aditya Garasangi. All rights reserved.</span><span class="footer-note" data-v-1c6873d8>Made with <span class="heart" data-v-1c6873d8>♥</span> and way too much caffeine.</span></div></div></footer>`);
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Footer.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var Footer_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$11, [["__scopeId", "data-v-1c6873d8"]]);
//#endregion
//#region src/App.vue
var _sfc_main$10 = {
	__name: "App",
	__ssrInlineRender: true,
	setup(__props) {
		const particleCanvas = ref(null);
		onMounted(() => {
			const canvas = particleCanvas.value;
			const ctx = canvas.getContext("2d");
			const resize = () => {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			};
			window.addEventListener("resize", resize);
			resize();
			const particles = [];
			const particleCount = 50;
			for (let i = 0; i < particleCount; i++) particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 2 + .5,
				speedX: (Math.random() - .5) * .5,
				speedY: (Math.random() - .5) * .5,
				opacity: Math.random() * .5 + .1
			});
			const animate = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				particles.forEach((p) => {
					p.x += p.speedX;
					p.y += p.speedY;
					if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
					if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity})`;
					ctx.fill();
				});
				requestAnimationFrame(animate);
			};
			animate();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_view = resolveComponent("router-view");
			_push(`<div${ssrRenderAttrs(mergeProps({ id: "app-container" }, _attrs))} data-v-b08cce63><canvas class="particles-bg" data-v-b08cce63></canvas>`);
			_push(ssrRenderComponent(Navbar_default, null, null, _parent));
			_push(`<main class="main-content" data-v-b08cce63>`);
			_push(ssrRenderComponent(_component_router_view, null, {
				default: withCtx(({ Component, route }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(``);
						ssrRenderVNode(_push, createVNode(resolveDynamicComponent(Component), { key: route.fullPath }, null), _parent, _scopeId);
					} else return [createVNode(Transition, {
						name: "page",
						mode: "out-in"
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(Component), { key: route.fullPath }))]),
						_: 2
					}, 1024)];
				}),
				_: 1
			}, _parent));
			_push(`</main>`);
			_push(ssrRenderComponent(Footer_default, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var App_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$10, [["__scopeId", "data-v-b08cce63"]]);
//#endregion
//#region /images/pfp.jpg
var pfp_default = "/images/pfp.jpg";
//#endregion
//#region src/utils/projectFormatter.js
var FEATURED_REPOS = [
	"terraform-aws-infrastructure",
	"AWS-Devops-Portfolio-Deployment",
	"dockerized-nodejs-mongo-app",
	"Kubernetes-Email-Submission-App"
];
var CUSTOM_TITLES = {
	"AWS-Devops-Portfolio-Deployment": "AWS DevOps Portfolio Deployment",
	"dockerized-nodejs-mongo-app": "Dockerized Node.js MongoDB App",
	"Kubernetes-Email-Submission-App": "Kubernetes Email Submission App",
	"terraform-aws-infrastructure": "Terraform AWS Infrastructure",
	"adityagarasangi.in": "adityagarasangi.in",
	"AdityaGarasangi": "AdityaGarasangi",
	"Jenkins-CICD-Pipeline-Nodejs": "Jenkins CICD Pipeline Nodejs",
	"DPDzero-Devops-Assignment": "DPDzero Devops Assignment"
};
var formatProjectTitle = (repoName) => {
	if (!repoName) return "";
	if (CUSTOM_TITLES[repoName]) return CUSTOM_TITLES[repoName];
	return repoName.split(/[-_]+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
};
//#endregion
//#region src/components/ProjectCard.vue
var _sfc_main$9 = {
	__name: "ProjectCard",
	__ssrInlineRender: true,
	props: { project: Object },
	emits: ["peek"],
	setup(__props) {
		const calculatePercentage = (bytes, allLanguages) => {
			const total = Object.values(allLanguages).reduce((sum, b) => sum + b, 0);
			return total > 0 ? Math.round(bytes / total * 100) : 0;
		};
		const getLanguageColor = (lang) => {
			return {
				"JavaScript": "#f1e05a",
				"TypeScript": "#3178c6",
				"Python": "#3572A5",
				"HTML": "#e34c26",
				"CSS": "#563d7c",
				"Vue": "#41b883",
				"Go": "#00ADD8",
				"Shell": "#89e051",
				"Dockerfile": "#384d54",
				"HCL": "#844FBA",
				"Java": "#b07219",
				"Ruby": "#701516"
			}[lang] || "#6e7681";
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "project-card glass-card" }, _attrs))} data-v-2605e01d><div class="card-header" data-v-2605e01d><div class="title-group" data-v-2605e01d><h3 class="project-title" data-v-2605e01d><a${ssrRenderAttr("href", __props.project.html_url)} target="_blank" data-v-2605e01d>${ssrInterpolate(__props.project.displayName || unref(formatProjectTitle)(__props.project.name))}</a></h3>`);
			if (__props.project.topics?.length) {
				_push(`<div class="project-topics" data-v-2605e01d><!--[-->`);
				ssrRenderList(__props.project.topics.slice(0, 3), (topic) => {
					_push(`<span class="topic-tag" data-v-2605e01d>#${ssrInterpolate(topic)}</span>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="header-actions" data-v-2605e01d><button class="icon-btn" title="Quick Look" data-v-2605e01d><i class="far fa-eye" data-v-2605e01d></i></button><a${ssrRenderAttr("href", __props.project.html_url)} target="_blank" class="icon-btn" title="View on GitHub" data-v-2605e01d><i class="fab fa-github" data-v-2605e01d></i></a></div></div><div class="project-body" data-v-2605e01d><p class="description" data-v-2605e01d>${ssrInterpolate(__props.project.description || "No description available.")}</p>`);
			if (Object.keys(__props.project.languages || {}).length) {
				_push(`<div class="tech-stack" data-v-2605e01d><div class="mini-progress-bar" data-v-2605e01d><!--[-->`);
				ssrRenderList(__props.project.languages, (bytes, lang) => {
					_push(`<span class="progress-seg" style="${ssrRenderStyle({
						width: calculatePercentage(bytes, __props.project.languages) + "%",
						backgroundColor: getLanguageColor(lang)
					})}" data-v-2605e01d></span>`);
				});
				_push(`<!--]--></div><div class="lang-labels" data-v-2605e01d><!--[-->`);
				ssrRenderList(__props.project.languages, (bytes, lang) => {
					_push(`<span class="lang-item" data-v-2605e01d><span class="lang-dot" style="${ssrRenderStyle({ backgroundColor: getLanguageColor(lang) })}" data-v-2605e01d></span> ${ssrInterpolate(lang)} <span class="percent" data-v-2605e01d>${ssrInterpolate(calculatePercentage(bytes, __props.project.languages))}%</span></span>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProjectCard.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var ProjectCard_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$9, [["__scopeId", "data-v-2605e01d"]]);
//#endregion
//#region src/components/BlogCard.vue
var _sfc_main$8 = {
	__name: "BlogCard",
	__ssrInlineRender: true,
	props: {
		post: Object,
		isFeatured: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const formatDate = (dateStr) => {
			if (!dateStr) return "";
			return new Date(dateStr).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric"
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "glass-card blog-card group" }, _attrs, ssrGetDirectiveProps(_ctx, resolveDirective("reveal"))))} data-v-3b6e9420>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: `/blog/${__props.post.slug}`,
				class: "blog-card-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="blog-content" data-v-3b6e9420${_scopeId}><div class="meta-top" data-v-3b6e9420${_scopeId}><span class="date" data-v-3b6e9420${_scopeId}>${ssrInterpolate(formatDate(__props.post.publishedAt))}</span><span class="read-time" data-v-3b6e9420${_scopeId}><i class="far fa-clock" data-v-3b6e9420${_scopeId}></i> ${ssrInterpolate(__props.post.readTimeInMinutes)} min read</span></div><h3 class="title group-hover:text-gradient" data-v-3b6e9420${_scopeId}>${ssrInterpolate(__props.post.title)}</h3><div class="footer-row" data-v-3b6e9420${_scopeId}>`);
						if (__props.post.tags?.length) {
							_push(`<div class="tags-container" data-v-3b6e9420${_scopeId}><!--[-->`);
							ssrRenderList(__props.post.tags.slice(0, 3), (tag) => {
								_push(`<span class="tag-pill" data-v-3b6e9420${_scopeId}>${ssrInterpolate(tag.name)}</span>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`<span class="read-more" data-v-3b6e9420${_scopeId}>Read <i class="fas fa-arrow-right ml-1" data-v-3b6e9420${_scopeId}></i></span></div></div>`);
					} else return [createVNode("div", { class: "blog-content" }, [
						createVNode("div", { class: "meta-top" }, [createVNode("span", { class: "date" }, toDisplayString(formatDate(__props.post.publishedAt)), 1), createVNode("span", { class: "read-time" }, [createVNode("i", { class: "far fa-clock" }), createTextVNode(" " + toDisplayString(__props.post.readTimeInMinutes) + " min read", 1)])]),
						createVNode("h3", { class: "title group-hover:text-gradient" }, toDisplayString(__props.post.title), 1),
						createVNode("div", { class: "footer-row" }, [__props.post.tags?.length ? (openBlock(), createBlock("div", {
							key: 0,
							class: "tags-container"
						}, [(openBlock(true), createBlock(Fragment, null, renderList(__props.post.tags.slice(0, 3), (tag) => {
							return openBlock(), createBlock("span", {
								key: tag.name,
								class: "tag-pill"
							}, toDisplayString(tag.name), 1);
						}), 128))])) : createCommentVNode("", true), createVNode("span", { class: "read-more" }, [createTextVNode("Read "), createVNode("i", { class: "fas fa-arrow-right ml-1" })])])
					])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/BlogCard.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var BlogCard_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$8, [["__scopeId", "data-v-3b6e9420"]]);
//#endregion
//#region src/views/Home.vue
var _sfc_main$7 = {
	__name: "Home",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Aditya Garasangi | Portfolio",
			meta: [
				{
					name: "description",
					content: "Explore the portfolio of Aditya Garasangi, a DevOps and Cloud Engineering enthusiast building scalable infrastructure and modern web apps."
				},
				{
					property: "og:title",
					content: "Aditya Garasangi | Portfolio"
				},
				{
					property: "og:description",
					content: "DevOps, Cloud Engineering, and Software Development Portfolio."
				},
				{
					property: "og:type",
					content: "website"
				}
			]
		});
		const introLines = [
			"I like building things that are clean, simple, and actually work — and fixing them when they don’t.",
			"I like creating things that feel simple, useful, and thoughtfully made.",
			"Building, learning, breaking things, and figuring them out along the way.",
			"Somewhere between creativity, curiosity, and controlled chaos.",
			"Trying to make useful things while enjoying life along the way.",
			"Making life better with music, memes, and good food.",
			"Probably listening to music or laughing at something dumb right now.",
			"Enjoying good food, good music, and peaceful little moments.",
			"Here for good vibes, fun conversations, and comfort shows.",
			"Just vibing through life with music in the background."
		];
		const currentIntro = ref({
			line1: "",
			line2: ""
		});
		const typedLine1 = ref("");
		const typedLine2 = ref("");
		const typingPhase = ref(1);
		const mounted = ref(false);
		const typeText = () => {
			let i = 0;
			const speed = 40;
			const typeLine1 = () => {
				if (i < currentIntro.value.line1.length) {
					typedLine1.value += currentIntro.value.line1.charAt(i);
					i++;
					setTimeout(typeLine1, speed);
				} else if (currentIntro.value.line2) {
					typingPhase.value = 2;
					i = 0;
					setTimeout(typeLine2, 200);
				} else typingPhase.value = 0;
			};
			const typeLine2 = () => {
				if (i < currentIntro.value.line2.length) {
					typedLine2.value += currentIntro.value.line2.charAt(i);
					i++;
					setTimeout(typeLine2, speed);
				} else typingPhase.value = 0;
			};
			typeLine1();
		};
		const shuffleArray = (arr) => {
			const newArr = [...arr];
			for (let i = newArr.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
			}
			return newArr;
		};
		const getBalancedLines = (text) => {
			if (text.length <= 50) return {
				line1: text,
				line2: ""
			};
			const words = text.split(" ");
			let bestSplit = 0;
			let smallestDiff = Infinity;
			for (let i = 1; i < words.length - 1; i++) {
				const l1 = words.slice(0, i).join(" ");
				const l2 = words.slice(i).join(" ");
				const diff = l1.length - l2.length;
				if (diff > 0 && diff < smallestDiff) {
					smallestDiff = diff;
					bestSplit = i;
				}
			}
			if (bestSplit === 0) bestSplit = Math.ceil(words.length / 2);
			return {
				line1: words.slice(0, bestSplit).join(" "),
				line2: words.slice(bestSplit).join(" ")
			};
		};
		const initRotatingText = () => {
			let savedState = null;
			try {
				savedState = JSON.parse(localStorage.getItem("intro_rotation"));
			} catch (e) {}
			if (!savedState || !savedState.shuffled || savedState.currentIndex >= savedState.shuffled.length) savedState = {
				shuffled: shuffleArray(introLines),
				currentIndex: 0
			};
			const selectedText = savedState.shuffled[savedState.currentIndex];
			currentIntro.value = getBalancedLines(selectedText);
			savedState.currentIndex += 1;
			localStorage.setItem("intro_rotation", JSON.stringify(savedState));
			mounted.value = true;
			setTimeout(typeText, 300);
		};
		const featuredProjects = ref([]);
		const loadingProjects = ref(true);
		const featuredBlogs = ref([]);
		const loadingBlogs = ref(true);
		const fetchProjects = async () => {
			try {
				const res = await fetch("/api/github/repos");
				if (!res.ok) throw new Error("Failed to fetch repos");
				const allRepos = (await res.json()).data || [];
				featuredProjects.value = FEATURED_REPOS.map((name) => allRepos.find((r) => r.name === name)).filter(Boolean);
			} catch (e) {
				console.error("Failed to load projects", e);
			} finally {
				loadingProjects.value = false;
			}
		};
		const fetchBlogs = async () => {
			try {
				const res = await fetch("/api/blogs?limit=4");
				if (!res.ok) throw new Error("Failed to fetch blogs");
				featuredBlogs.value = (await res.json()).data?.blogs || [];
			} catch (e) {
				console.error("Failed to load blogs", e);
			} finally {
				loadingBlogs.value = false;
			}
		};
		const form = ref({
			name: "",
			email: "",
			message: "",
			hp: ""
		});
		const formStatus = ref({
			loading: false,
			message: "",
			type: ""
		});
		onMounted(() => {
			initRotatingText();
			fetchProjects();
			fetchBlogs();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))} data-v-f32d9cd7><section id="home" class="hero" data-v-f32d9cd7><div class="glow-blob" data-v-f32d9cd7></div><div class="container hero-content" data-v-f32d9cd7><h1 class="hero-title" data-v-f32d9cd7>Hey, I&#39;m <span class="text-gradient" data-v-f32d9cd7>Aditya</span></h1>`);
			if (mounted.value) {
				_push(`<div class="hero-subtitle-container" data-v-f32d9cd7><div class="intro-text" data-v-f32d9cd7><p class="hero-subtitle" data-v-f32d9cd7>${ssrInterpolate(typedLine1.value)}`);
				if (typingPhase.value === 1) _push(`<span class="cursor" data-v-f32d9cd7>|</span>`);
				else _push(`<!---->`);
				_push(`</p>`);
				if (currentIntro.value.line2 || typingPhase.value === 2) {
					_push(`<p class="hero-subtitle" data-v-f32d9cd7>${ssrInterpolate(typedLine2.value)}`);
					if (typingPhase.value === 2) _push(`<span class="cursor" data-v-f32d9cd7>|</span>`);
					else _push(`<!---->`);
					_push(`</p>`);
				} else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="hero-actions" data-v-f32d9cd7>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/side-hustles",
				class: "btn btn-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`See my side hustles`);
					else return [createTextVNode("See my side hustles")];
				}),
				_: 1
			}, _parent));
			_push(`<a href="#contact" class="btn btn-secondary" data-v-f32d9cd7>Let&#39;s talk</a></div></div></section><section id="projects" data-v-f32d9cd7><div class="container" data-v-f32d9cd7><div class="section-header-row" data-v-f32d9cd7><h2 class="section-title" data-v-f32d9cd7>Side Hustles</h2>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/side-hustles",
				class: "btn-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`View everything <i class="fas fa-arrow-right" data-v-f32d9cd7${_scopeId}></i>`);
					else return [createTextVNode("View everything "), createVNode("i", { class: "fas fa-arrow-right" })];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (loadingProjects.value) {
				_push(`<div class="grid grid-cols-2" data-v-f32d9cd7><!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="glass-card flex flex-col gap-4" data-v-f32d9cd7><div class="skeleton skeleton-title" data-v-f32d9cd7></div><div class="skeleton skeleton-text" data-v-f32d9cd7></div><div class="skeleton skeleton-text" style="${ssrRenderStyle({ "width": "80%" })}" data-v-f32d9cd7></div><div class="flex gap-4 mt-auto" data-v-f32d9cd7><div class="skeleton skeleton-pill" data-v-f32d9cd7></div><div class="skeleton skeleton-pill" data-v-f32d9cd7></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (featuredProjects.value.length) {
				_push(`<div class="grid grid-cols-2" data-v-f32d9cd7><!--[-->`);
				ssrRenderList(featuredProjects.value, (repo) => {
					_push(ssrRenderComponent(ProjectCard_default, {
						key: repo.id,
						project: repo
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="error-msg" data-v-f32d9cd7>Failed to load projects.</div>`);
			_push(`</div></section><section id="blogs" data-v-f32d9cd7><div class="container" data-v-f32d9cd7><div class="section-header-row" data-v-f32d9cd7><h2 class="section-title" data-v-f32d9cd7>Blogs</h2>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/blogs",
				class: "btn-link"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`View everything <i class="fas fa-arrow-right" data-v-f32d9cd7${_scopeId}></i>`);
					else return [createTextVNode("View everything "), createVNode("i", { class: "fas fa-arrow-right" })];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (loadingBlogs.value) {
				_push(`<div class="grid grid-cols-2" data-v-f32d9cd7><!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="glass-card flex flex-col gap-4" data-v-f32d9cd7><div class="flex gap-4 mb-2" data-v-f32d9cd7><div class="skeleton skeleton-pill" style="${ssrRenderStyle({ "width": "40px" })}" data-v-f32d9cd7></div><div class="skeleton skeleton-pill" style="${ssrRenderStyle({ "width": "80px" })}" data-v-f32d9cd7></div></div><div class="skeleton skeleton-title" style="${ssrRenderStyle({ "width": "90%" })}" data-v-f32d9cd7></div><div class="flex justify-between items-center mt-auto" data-v-f32d9cd7><div class="flex gap-2" data-v-f32d9cd7><div class="skeleton skeleton-pill" data-v-f32d9cd7></div><div class="skeleton skeleton-pill" data-v-f32d9cd7></div></div><div class="skeleton skeleton-pill" style="${ssrRenderStyle({ "width": "50px" })}" data-v-f32d9cd7></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (featuredBlogs.value.length) {
				_push(`<div class="grid grid-cols-2 blogs-grid" data-v-f32d9cd7><!--[-->`);
				ssrRenderList(featuredBlogs.value, (post, index) => {
					_push(ssrRenderComponent(BlogCard_default, {
						key: post.slug,
						post,
						isFeatured: index === 0
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="text-center mt-8" data-v-f32d9cd7><p class="text-muted" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-f32d9cd7>Still no blogs to show yet, but I&#39;m working on some cool stuff!</p></div>`);
			_push(`</div></section><section id="overview" class="py-12" data-v-f32d9cd7><div class="container" data-v-f32d9cd7><div class="glass-card overview-dashboard" data-v-f32d9cd7><div class="overview-left" data-v-f32d9cd7><div class="overview-img-container" data-v-f32d9cd7><div class="overview-glow" data-v-f32d9cd7></div><img${ssrRenderAttr("src", pfp_default)} alt="Aditya" class="overview-img" data-v-f32d9cd7></div><div class="overview-intro text-center md:text-left" data-v-f32d9cd7><h3 class="text-2xl font-bold mb-3" data-v-f32d9cd7>Me, in a nutshell</h3><p class="text-muted mb-6" data-v-f32d9cd7>Just a tech enthusiast who loves diving into new technologies, sipping good coffee, and building cool things.</p>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/about",
				class: "btn-link font-bold"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Get to know me better <i class="fas fa-arrow-right ml-1" data-v-f32d9cd7${_scopeId}></i>`);
					else return [createTextVNode("Get to know me better "), createVNode("i", { class: "fas fa-arrow-right ml-1" })];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="overview-divider" data-v-f32d9cd7></div><div class="overview-right relative overflow-hidden" data-v-f32d9cd7><div class="absolute top-0 right-0 p-4 text-indigo-400 opacity-10 text-8xl pointer-events-none" data-v-f32d9cd7><i class="fas fa-briefcase" data-v-f32d9cd7></i></div><h3 class="text-xl font-bold mb-6 text-accent uppercase tracking-wider" data-v-f32d9cd7><i class="fas fa-satellite-dish mr-2 pulse-icon" data-v-f32d9cd7></i> What I’m up to</h3><div class="mb-6 z-10" data-v-f32d9cd7><span class="text-muted text-sm font-bold uppercase tracking-wider block mb-1" data-v-f32d9cd7>Currently working as</span><p class="text-xl font-bold" data-v-f32d9cd7>Product Engineer <span class="text-muted font-normal" data-v-f32d9cd7>@ SecurEnds</span></p></div><div class="mb-8 z-10" data-v-f32d9cd7><span class="text-muted text-sm font-bold uppercase tracking-wider block mb-1" data-v-f32d9cd7>Spending most of my time on</span><p class="text-lg" data-v-f32d9cd7>DevOps, Cloud and IaC</p></div>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/journey",
				class: "btn btn-primary text-sm self-start z-10"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`View my full journey`);
					else return [createTextVNode("View my full journey")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></section><section id="contact" data-v-f32d9cd7><div class="container" data-v-f32d9cd7><div class="section-header text-center mb-8" data-v-f32d9cd7><h2 class="section-title mb-4" data-v-f32d9cd7>Reach out</h2><p class="text-muted" data-v-f32d9cd7>Have a question, an opportunity, or just want to chat? Drop me a line.</p></div><div class="contact-grid" data-v-f32d9cd7><div class="glass-card contact-form-card" data-v-f32d9cd7><form data-v-f32d9cd7><input type="text"${ssrRenderAttr("value", form.value.hp)} style="${ssrRenderStyle({ "display": "none" })}" tabindex="-1" autocomplete="off" data-v-f32d9cd7><div class="form-group" data-v-f32d9cd7><label class="form-label" data-v-f32d9cd7>Name</label><input type="text"${ssrRenderAttr("value", form.value.name)} class="form-control" required data-v-f32d9cd7></div><div class="form-group" data-v-f32d9cd7><label class="form-label" data-v-f32d9cd7>Email</label><input type="email"${ssrRenderAttr("value", form.value.email)} class="form-control" required data-v-f32d9cd7></div><div class="form-group" data-v-f32d9cd7><label class="form-label" data-v-f32d9cd7>Message</label><textarea class="form-control" required data-v-f32d9cd7>${ssrInterpolate(form.value.message)}</textarea></div><button type="submit" class="btn btn-primary" style="${ssrRenderStyle({ "width": "100%" })}"${ssrIncludeBooleanAttr(formStatus.value.loading) ? " disabled" : ""} data-v-f32d9cd7>`);
			if (formStatus.value.loading) _push(`<span data-v-f32d9cd7><i class="fas fa-circle-notch fa-spin" data-v-f32d9cd7></i> Sending...</span>`);
			else _push(`<span data-v-f32d9cd7>Send Message</span>`);
			_push(`</button>`);
			if (formStatus.value.message) _push(`<p class="${ssrRenderClass(["form-msg", formStatus.value.type])}" data-v-f32d9cd7>${ssrInterpolate(formStatus.value.message)}</p>`);
			else _push(`<!---->`);
			_push(`</form></div><div class="contact-info" data-v-f32d9cd7><h3 class="mb-4" data-v-f32d9cd7>Let&#39;s connect</h3><p class="text-muted mb-8" data-v-f32d9cd7>I&#39;m pretty active on email and LinkedIn. Feel free to reach out anytime.</p><div class="info-item" data-v-f32d9cd7><div class="info-icon" data-v-f32d9cd7><i class="fas fa-envelope" data-v-f32d9cd7></i></div><div data-v-f32d9cd7><span class="info-label" data-v-f32d9cd7>Email</span><a href="mailto:adityagarasangi77@gmail.com" class="info-val" data-v-f32d9cd7>adityagarasangi77@gmail.com</a></div></div><div class="info-item" data-v-f32d9cd7><div class="info-icon" data-v-f32d9cd7><i class="fab fa-linkedin" data-v-f32d9cd7></i></div><div data-v-f32d9cd7><span class="info-label" data-v-f32d9cd7>Network</span><a href="https://www.linkedin.com/in/adityagarasangi/" target="_blank" class="info-val" data-v-f32d9cd7>LinkedIn Profile</a></div></div></div></div></div></section></div>`);
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Home.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var Home_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$7, [["__scopeId", "data-v-f32d9cd7"]]);
//#endregion
//#region src/components/Modal.vue
var _sfc_main$6 = {
	__name: "Modal",
	__ssrInlineRender: true,
	props: {
		show: Boolean,
		title: String
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const lockScroll = (lock) => {
			const state = lock ? "hidden" : "";
			document.body.style.overflow = state;
			document.documentElement.style.overflow = state;
		};
		watch(() => props.show, (newVal) => {
			lockScroll(newVal);
		}, { immediate: true });
		onUnmounted(() => {
			lockScroll(false);
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.show) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "modal-overlay" }, _attrs))} data-v-9e07d603><div class="modal-container glass-card" data-v-9e07d603><div class="modal-header" data-v-9e07d603><h3 class="modal-title" data-v-9e07d603>${ssrInterpolate(__props.title)}</h3><button class="close-btn" data-v-9e07d603><i class="fas fa-times" data-v-9e07d603></i></button></div><div class="modal-body custom-scrollbar" data-v-9e07d603>`);
				ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
				_push(`</div></div></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/Modal.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var Modal_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$6, [["__scopeId", "data-v-9e07d603"]]);
//#endregion
//#region src/views/Projects.vue
var _sfc_main$5 = {
	__name: "Projects",
	__ssrInlineRender: true,
	setup(__props) {
		const marked = new Marked(markedHighlight({
			langPrefix: "hljs language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			}
		}));
		useHead({
			title: "Side Hustles | Aditya Garasangi",
			meta: [{
				name: "description",
				content: "A collection of my technical projects, tools, and side hustles."
			}]
		});
		const projects = ref([]);
		const loading = ref(true);
		const showReadmeModal = ref(false);
		const loadingReadme = ref(false);
		const peekProject = ref(null);
		const renderedReadme = ref("");
		const handlePeek = async (project) => {
			peekProject.value = project;
			showReadmeModal.value = true;
			loadingReadme.value = true;
			renderedReadme.value = "";
			try {
				const res = await fetch(`/api/github/readme/adityagarasangi/${project.name}?branch=${project.default_branch || "main"}`);
				if (!res.ok) throw new Error("README not found");
				const result = await res.json();
				renderedReadme.value = marked.parse(result.data || "No documentation found.");
			} catch (e) {
				console.error("Failed to load README", e);
				renderedReadme.value = `<div class="text-center py-12 text-muted">${e.message === "README not found" ? "No README.md found for this repository." : `Failed to load: ${e.message}`}</div>`;
			} finally {
				loadingReadme.value = false;
			}
		};
		const closeModal = () => {
			showReadmeModal.value = false;
		};
		const fetchProjects = async () => {
			try {
				const res = await fetch("/api/github/repos");
				if (!res.ok) throw new Error("Failed to fetch repos");
				projects.value = (await res.json()).data || [];
			} catch (e) {
				console.error("Failed to load projects", e);
			} finally {
				loading.value = false;
			}
		};
		onMounted(() => {
			fetchProjects();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "projects-view pt-32 pb-16" }, _attrs))} data-v-3622b479><div class="container text-center mb-12" data-v-3622b479><h1 class="section-title mb-4" data-v-3622b479>Side Hustles</h1><p class="text-muted" data-v-3622b479>Exploring my latest repositories, experiments, and contributions</p></div><div class="container" data-v-3622b479>`);
			if (loading.value) {
				_push(`<div class="grid grid-cols-2" data-v-3622b479><!--[-->`);
				ssrRenderList(6, (i) => {
					_push(`<div class="glass-card flex flex-col gap-4" data-v-3622b479><div class="skeleton skeleton-title" data-v-3622b479></div><div class="skeleton skeleton-text" data-v-3622b479></div><div class="skeleton skeleton-text" style="${ssrRenderStyle({ "width": "80%" })}" data-v-3622b479></div><div class="flex gap-4 mt-auto" data-v-3622b479><div class="skeleton skeleton-pill" data-v-3622b479></div><div class="skeleton skeleton-pill" data-v-3622b479></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (projects.value.length) {
				_push(`<div class="grid grid-cols-2" data-v-3622b479><!--[-->`);
				ssrRenderList(projects.value, (repo) => {
					_push(ssrRenderComponent(ProjectCard_default, {
						key: repo.id,
						project: repo,
						onPeek: handlePeek
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="text-center text-red-400" data-v-3622b479>Failed to load projects.</div>`);
			_push(`</div>`);
			_push(ssrRenderComponent(Modal_default, {
				show: showReadmeModal.value,
				title: peekProject.value?.name ? unref(formatProjectTitle)(peekProject.value.name) : "Project Documentation",
				onClose: closeModal
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (loadingReadme.value) _push(`<div class="text-center py-12" data-v-3622b479${_scopeId}><i class="fas fa-spinner fa-spin fa-3x text-accent mb-4" data-v-3622b479${_scopeId}></i><p class="text-muted" data-v-3622b479${_scopeId}>Fetching documentation from GitHub...</p></div>`);
					else _push(`<div class="markdown-body" data-v-3622b479${_scopeId}>${renderedReadme.value ?? ""}</div>`);
					else return [loadingReadme.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "text-center py-12"
					}, [createVNode("i", { class: "fas fa-spinner fa-spin fa-3x text-accent mb-4" }), createVNode("p", { class: "text-muted" }, "Fetching documentation from GitHub...")])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "markdown-body",
						innerHTML: renderedReadme.value
					}, null, 8, ["innerHTML"]))];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Projects.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var Projects_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$5, [["__scopeId", "data-v-3622b479"]]);
//#endregion
//#region src/views/Blogs.vue
var _sfc_main$4 = {
	__name: "Blogs",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Blogs | Aditya Garasangi",
			meta: [{
				name: "description",
				content: "Technical articles, thoughts, and tutorials on DevOps and Cloud engineering."
			}]
		});
		const blogs = ref([]);
		const loading = ref(true);
		const loadingMore = ref(false);
		const hasMore = ref(false);
		const nextCursor = ref(null);
		const activeTag = ref(null);
		const allTags = computed(() => {
			const tagSet = /* @__PURE__ */ new Set();
			blogs.value.forEach((post) => {
				post.tags?.forEach((t) => tagSet.add(t.name));
			});
			return [...tagSet].sort();
		});
		const filteredBlogs = computed(() => {
			if (!activeTag.value) return blogs.value;
			return blogs.value.filter((post) => post.tags?.some((t) => t.name === activeTag.value));
		});
		const fetchBlogs = async (cursor = null) => {
			try {
				const url = cursor ? `/api/blogs?cursor=${cursor}` : "/api/blogs";
				const res = await fetch(url);
				if (!res.ok) throw new Error("Failed to fetch blogs");
				const result = await res.json();
				if (cursor) blogs.value = [...blogs.value, ...result.data.blogs];
				else blogs.value = result.data.blogs || [];
				hasMore.value = result.data.has_more;
				nextCursor.value = result.data.next_cursor;
			} catch (e) {
				console.error("Failed to load blogs", e);
			} finally {
				loading.value = false;
				loadingMore.value = false;
			}
		};
		onMounted(() => {
			fetchBlogs();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "blogs-view pt-32 pb-16" }, _attrs))} data-v-260da31c><div class="container text-center mb-12" data-v-260da31c><h1 class="section-title mb-4" data-v-260da31c>All Blogs</h1><p class="text-muted" data-v-260da31c>Documenting my journey, experiences, and learnings in tech.</p></div><div class="container" data-v-260da31c>`);
			if (allTags.value.length) {
				_push(`<div class="tag-filter-bar mb-8" data-v-260da31c><button class="${ssrRenderClass([{ active: activeTag.value === null }, "tag-filter-btn"])}" data-v-260da31c>All</button><!--[-->`);
				ssrRenderList(allTags.value, (tag) => {
					_push(`<button class="${ssrRenderClass([{ active: activeTag.value === tag }, "tag-filter-btn"])}" data-v-260da31c>${ssrInterpolate(tag)}</button>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			if (loading.value) {
				_push(`<div class="blogs-list max-w-3xl mx-auto flex flex-col gap-6" data-v-260da31c><!--[-->`);
				ssrRenderList(5, (i) => {
					_push(`<div class="glass-card flex flex-col gap-4" style="${ssrRenderStyle({ "padding": "1.5rem 2rem" })}" data-v-260da31c><div class="flex gap-4 mb-2" data-v-260da31c><div class="skeleton skeleton-pill" style="${ssrRenderStyle({ "width": "80px" })}" data-v-260da31c></div><div class="skeleton skeleton-pill" style="${ssrRenderStyle({ "width": "60px" })}" data-v-260da31c></div></div><div class="skeleton skeleton-title" style="${ssrRenderStyle({
						"width": "90%",
						"height": "2rem"
					})}" data-v-260da31c></div><div class="flex justify-between items-center mt-2" data-v-260da31c><div class="flex gap-2" data-v-260da31c><div class="skeleton skeleton-pill" data-v-260da31c></div><div class="skeleton skeleton-pill" data-v-260da31c></div><div class="skeleton skeleton-pill" data-v-260da31c></div></div><div class="skeleton skeleton-pill" style="${ssrRenderStyle({ "width": "60px" })}" data-v-260da31c></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (filteredBlogs.value.length) {
				_push(`<div class="blogs-list max-w-3xl mx-auto flex flex-col gap-6" data-v-260da31c><!--[-->`);
				ssrRenderList(filteredBlogs.value, (post) => {
					_push(ssrRenderComponent(BlogCard_default, {
						key: post.slug,
						post
					}, null, _parent));
				});
				_push(`<!--]-->`);
				if (hasMore.value && !activeTag.value) {
					_push(`<div class="text-center mt-8 mb-4" data-v-260da31c><button class="btn btn-primary"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-260da31c>`);
					if (loadingMore.value) _push(`<span data-v-260da31c><i class="fas fa-spinner fa-spin mr-2" data-v-260da31c></i> Loading...</span>`);
					else _push(`<span data-v-260da31c>Load More</span>`);
					_push(`</button></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else {
				_push(`<div class="text-center mt-8" data-v-260da31c><p class="text-muted" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-260da31c>`);
				if (activeTag.value) _push(`<span data-v-260da31c>No posts tagged &quot;<strong data-v-260da31c>${ssrInterpolate(activeTag.value)}</strong>&quot; yet.</span>`);
				else _push(`<span data-v-260da31c>Still no blogs to show yet, but I&#39;m working on some cool stuff!</span>`);
				_push(`</p>`);
				if (activeTag.value) _push(`<button class="btn btn-secondary mt-4" data-v-260da31c>Clear filter</button>`);
				else _push(`<!---->`);
				_push(`</div>`);
			}
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Blogs.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var Blogs_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$4, [["__scopeId", "data-v-260da31c"]]);
//#endregion
//#region src/views/BlogRead.vue
var _sfc_main$3 = {
	__name: "BlogRead",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const post = ref(null);
		const loading = ref(true);
		const readingProgress = ref(0);
		const currentUrl = computed(() => typeof window !== "undefined" ? window.location.href : "");
		const toast = ref({
			show: false,
			message: ""
		});
		useHead({
			title: () => post.value ? `${post.value.title} | Blog` : "Loading...",
			meta: [{
				name: "description",
				content: () => post.value?.brief || "Engineering blog by Aditya Garasangi"
			}]
		});
		const marked = new Marked(markedHighlight({
			langPrefix: "hljs language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			}
		}));
		const fetchPost = async () => {
			const slug = route.params.slug;
			try {
				const res = await fetch(`/api/blogs/${slug}`);
				if (!res.ok) throw new Error();
				post.value = (await res.json()).data;
			} catch (e) {
				console.error(e);
			} finally {
				loading.value = false;
			}
		};
		const compiledMarkdown = computed(() => post.value?.contentMarkdown ? marked.parse(post.value.contentMarkdown) : "");
		const formatDate = (d) => new Date(d).toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric"
		});
		const updateProgress = () => {
			const h = document.documentElement;
			readingProgress.value = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight || document.body.scrollHeight) - h.clientHeight) * 100;
		};
		onMounted(() => {
			fetchPost();
			window.addEventListener("scroll", updateProgress);
		});
		onUnmounted(() => window.removeEventListener("scroll", updateProgress));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-read-view" }, _attrs))} data-v-ad057493><div class="ambient-glow" data-v-ad057493></div><div class="container blog-container" data-v-ad057493>`);
			if (loading.value) _push(`<div class="loading-screen" data-v-ad057493><div class="luxury-loader" data-v-ad057493></div><p data-v-ad057493>Polishing the story...</p></div>`);
			else if (post.value) {
				_push(`<article class="post-canvas" data-v-ad057493><header class="post-hero" data-v-ad057493>`);
				if (post.value.tags?.length) _push(`<div class="post-topic" data-v-ad057493><span class="topic-tag" data-v-ad057493>${ssrInterpolate(post.value.tags[0].name)}</span></div>`);
				else _push(`<!---->`);
				_push(`<h1 class="hero-title" data-v-ad057493>${ssrInterpolate(post.value.title)}</h1><div class="hero-meta glass" data-v-ad057493><div class="meta-author-group" data-v-ad057493><img${ssrRenderAttr("src", pfp_default)} alt="Aditya" class="meta-pfp" data-v-ad057493><div class="meta-name-stack" data-v-ad057493><span class="m-name" data-v-ad057493>Aditya Garasangi</span><span class="m-date" data-v-ad057493>${ssrInterpolate(formatDate(post.value.publishedAt))}</span></div></div><div class="meta-divider" data-v-ad057493></div><div class="meta-stats" data-v-ad057493><span class="m-read-time" data-v-ad057493>${ssrInterpolate(post.value.readTimeInMinutes)} MIN READ</span></div></div></header><section class="post-body-wrap" data-v-ad057493><div class="markdown-body premium-content" data-v-ad057493>${compiledMarkdown.value ?? ""}</div></section><footer class="post-finish" data-v-ad057493><div class="finish-callout glass" data-v-ad057493><div class="callout-header" data-v-ad057493><div class="callout-icon" data-v-ad057493><i class="fas fa-pencil-alt" data-v-ad057493></i></div><h3 data-v-ad057493>Thought this was interesting?</h3></div><p data-v-ad057493>Share this article with your friends and colleagues</p><div class="callout-footer" data-v-ad057493><div class="social-row" data-v-ad057493><button class="social-circle" title="Copy Link" data-v-ad057493><i class="fas fa-link" data-v-ad057493></i></button><a${ssrRenderAttr("href", `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.value.title)}&url=${encodeURIComponent(currentUrl.value)}`)} target="_blank" class="social-circle twitter" data-v-ad057493><i class="fab fa-x-twitter" data-v-ad057493></i></a><a${ssrRenderAttr("href", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`)} target="_blank" class="social-circle linkedin" data-v-ad057493><i class="fab fa-linkedin-in" data-v-ad057493></i></a></div>`);
				_push(ssrRenderComponent(_component_router_link, {
					to: "/blogs",
					class: "finish-back-btn"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` All Stories <i class="fas fa-arrow-right ml-2" data-v-ad057493${_scopeId}></i>`);
						else return [createTextVNode(" All Stories "), createVNode("i", { class: "fas fa-arrow-right ml-2" })];
					}),
					_: 1
				}, _parent));
				_push(`</div></div></footer></article>`);
			} else {
				_push(`<div class="post-not-found" data-v-ad057493><i class="fas fa-wind text-6xl opacity-10 mb-8" data-v-ad057493></i><h2 data-v-ad057493>Story not found</h2><p class="text-muted mb-8" data-v-ad057493>This article has been moved or deleted.</p>`);
				_push(ssrRenderComponent(_component_router_link, {
					to: "/blogs",
					class: "btn btn-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Return to Library`);
						else return [createTextVNode("Return to Library")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
			_push(`</div>`);
			if (toast.value.show) _push(`<div class="luxury-toast" data-v-ad057493><div class="toast-content" data-v-ad057493><i class="fas fa-check-circle" data-v-ad057493></i><span data-v-ad057493>${ssrInterpolate(toast.value.message)}</span></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/BlogRead.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var BlogRead_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$3, [["__scopeId", "data-v-ad057493"]]);
//#endregion
//#region src/views/Journey.vue
var _sfc_main$2 = {
	__name: "Journey",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "Journey",
			meta: [{
				name: "description",
				content: "A visual timeline of my career, education, and technical certifications."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "journey-view pt-32 pb-16" }, _attrs))} data-v-cff4141e><div class="container text-center mb-20" data-v-cff4141e><h1${ssrRenderAttrs(mergeProps({ class: "section-title mb-4" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e>My Journey</h1><p${ssrRenderAttrs(mergeProps({ class: "text-muted" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e>The milestones, experiences, and certifications that shaped my path.</p></div><div class="container" data-v-cff4141e><div class="timeline-wrapper" data-v-cff4141e><div class="timeline-line" data-v-cff4141e></div><div class="timeline-events" data-v-cff4141e><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass work" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>Aug 2025 - Present</span><span class="event-tag work" data-v-cff4141e>Experience</span></div><h3 class="event-title" data-v-cff4141e>Product Engineer (Trainee)</h3><p class="event-subtitle" data-v-cff4141e>SecurEnds Software</p><div class="event-location" data-v-cff4141e><i class="fas fa-map-marker-alt" data-v-cff4141e></i> Bengaluru, Karnataka, India </div><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Working as a DevOps Engineer, focusing on infrastructure automation and CI/CD pipelines.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass edu" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>Dec 2021 - May 2025</span><span class="event-tag edu" data-v-cff4141e>Education</span></div><h3 class="event-title" data-v-cff4141e>B.E. Computer Science</h3><p class="event-subtitle" data-v-cff4141e>Jain College of Engineering</p><div class="event-location" data-v-cff4141e><i class="fas fa-map-marker-alt" data-v-cff4141e></i> Belagavi, Karnataka, India </div><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Graduated with 8.40 <small data-v-cff4141e>CGPA</small><br data-v-cff4141e>Focused on core software engineering principles and cloud computing.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass cert" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>Dec 2024 - Dec 2027</span><span class="event-tag cert" data-v-cff4141e>Certification</span></div><h3 class="event-title" data-v-cff4141e>AWS Certified Cloud Practitioner</h3><p class="event-subtitle" data-v-cff4141e>Amazon Web Services</p><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Validated foundational cloud knowledge and AWS service ecosystem expertise.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass cert" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>2024</span><span class="event-tag cert" data-v-cff4141e>Certification</span></div><h3 class="event-title" data-v-cff4141e>AWS CLF-C02 Course</h3><p class="event-subtitle" data-v-cff4141e>Udemy</p><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Deep-dived into AWS architecture and security best practices.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass cert" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>2023</span><span class="event-tag cert" data-v-cff4141e>Certification</span></div><h3 class="event-title" data-v-cff4141e>Django Masterclass</h3><p class="event-subtitle" data-v-cff4141e>Udemy</p><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Mastered backend development using Python and the Django framework.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass edu" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>Jun 2021</span><span class="event-tag edu" data-v-cff4141e>Education</span></div><h3 class="event-title" data-v-cff4141e>Pre-University</h3><p class="event-subtitle" data-v-cff4141e>Mahesh PU College</p><div class="event-location" data-v-cff4141e><i class="fas fa-map-marker-alt" data-v-cff4141e></i> Hubballi, Karnataka, India </div><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Completed pre-university education with a focus on Science and Mathematics.</p></div></div></div><div${ssrRenderAttrs(mergeProps({ class: "timeline-event" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-cff4141e><div class="event-dot" data-v-cff4141e></div><div class="event-card glass edu" data-v-cff4141e><div class="event-header" data-v-cff4141e><span class="event-date" data-v-cff4141e>Jun 2019</span><span class="event-tag edu" data-v-cff4141e>Education</span></div><h3 class="event-title" data-v-cff4141e>High School</h3><p class="event-subtitle" data-v-cff4141e>Oriental High School</p><div class="event-location" data-v-cff4141e><i class="fas fa-map-marker-alt" data-v-cff4141e></i> Hubballi, Karnataka, India </div><div class="event-body" data-v-cff4141e><p data-v-cff4141e>Completed High School, establishing a strong academic foundation for higher education.</p></div></div></div></div></div></div></div>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Journey.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var Journey_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$2, [["__scopeId", "data-v-cff4141e"]]);
//#endregion
//#region src/views/About.vue
var _sfc_main$1 = {
	__name: "About",
	__ssrInlineRender: true,
	setup(__props) {
		useHead({
			title: "About | Aditya Garasangi",
			meta: [{
				name: "description",
				content: "DevOps Engineer focused on simplicity, efficiency, and building reliable cloud infrastructure."
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "about-view" }, _attrs))} data-v-ca887013><div class="container about-canvas" data-v-ca887013><header class="about-hero fade-in" data-v-ca887013><h1 class="about-title" data-v-ca887013>Aditya Garasangi</h1><p class="about-subtitle" data-v-ca887013>DevOps Engineer &amp; Cybersecurity Enthusiast</p></header><div class="about-content fade-in-delayed" data-v-ca887013><div class="story-section" data-v-ca887013><p class="lead" data-v-ca887013>just a tiny corner of the internet that feels a little like home.</p><p data-v-ca887013>This is my little spot on the web - somewhere to dump my posts, projects, random experiments, half-baked notes, and whatever else I feel like sharing. I&#39;m an engineer by day, explorer by… also day, honestly.</p><p data-v-ca887013>When I&#39;m not working, you&#39;ll probably find me deep in a rabbit hole of music or memes, accidentally staying up till 2am doomscrolling (we&#39;ve all been there), or watching &quot;just one more episode&quot; of a sitcom - which always, <em data-v-ca887013>always</em> turns into four.</p><p data-v-ca887013>Oh, and I take Bangalore&#39;s biryani scene very seriously. Like, embarrassingly seriously. Some people collect stamps or experiences - I collect &quot;bro you HAVE to try this place&quot; recommendations. My list keeps growing and I have zero regrets.</p><p data-v-ca887013>Still figuring a lot of things out as I go, but honestly? That&#39;s the fun part.</p><p class="footer-note" data-v-ca887013>Glad you made it here. Stay as long as you like 🙂</p></div><div class="about-footer-nav" data-v-ca887013><div class="nav-group" data-v-ca887013><span class="nav-label" data-v-ca887013>Connect</span><div class="nav-links" data-v-ca887013><a href="https://linkedin.com/in/adityagarasangi" target="_blank" data-v-ca887013>LinkedIn</a><span class="nav-sep" data-v-ca887013>•</span><a href="https://github.com/adityagarasangi" target="_blank" data-v-ca887013>GitHub</a><span class="nav-sep" data-v-ca887013>•</span><a href="https://twitter.com/adityagarasangi" target="_blank" data-v-ca887013>Twitter</a></div></div><div class="nav-group" data-v-ca887013><span class="nav-label" data-v-ca887013>Inquiries</span><a href="mailto:adityagarasangi77@gmail.com" class="email-link" data-v-ca887013>adityagarasangi77@gmail.com</a></div><div class="nav-group" data-v-ca887013><span class="nav-label" data-v-ca887013>Credentials</span><a href="https://drive.google.com/file/d/1aaov9G2PWMhvER-yXzbksmCdQOC_4XbK/view?usp=sharing" target="_blank" class="email-link" data-v-ca887013>View Resume</a></div></div></div></div></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/About.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var About_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-ca887013"]]);
//#endregion
//#region src/views/NotFound.vue
var _sfc_main = {
	__name: "NotFound",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_router_link = resolveComponent("router-link");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "not-found" }, _attrs))} data-v-41272dbd><div class="glow-blob" data-v-41272dbd></div><div class="container nf-content" data-v-41272dbd><div class="nf-code" data-v-41272dbd>404</div><h1 class="nf-title" data-v-41272dbd>You seem lost.</h1><p class="nf-subtitle" data-v-41272dbd>This page doesn&#39;t exist — or maybe it did and I deleted it. Either way, it&#39;s not here anymore.</p><div class="nf-actions" data-v-41272dbd>`);
			_push(ssrRenderComponent(_component_router_link, {
				to: "/",
				class: "btn btn-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Take me home`);
					else return [createTextVNode("Take me home")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_router_link, {
				to: "/blogs",
				class: "btn btn-secondary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Read my blogs`);
					else return [createTextVNode("Read my blogs")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/NotFound.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region src/router.js
var routes = [
	{
		path: "/",
		name: "Home",
		component: Home_default
	},
	{
		path: "/side-hustles",
		name: "Projects",
		component: Projects_default
	},
	{
		path: "/blogs",
		name: "Blogs",
		component: Blogs_default
	},
	{
		path: "/blog/:slug",
		name: "BlogRead",
		component: BlogRead_default
	},
	{
		path: "/journey",
		name: "Journey",
		component: Journey_default
	},
	{
		path: "/about",
		name: "About",
		component: About_default
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-41272dbd"]])
	}
];
var scrollBehavior = (to, from, savedPosition) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (to.hash) resolve({
				el: to.hash,
				behavior: "smooth"
			});
			else if (savedPosition) resolve(savedPosition);
			else resolve({
				top: 0,
				behavior: "instant"
			});
		}, 500);
	});
};
//#endregion
//#region src/main.js
var createApp = ViteSSG(App_default, {
	routes,
	scrollBehavior
}, ({ app, router, routes, isClient, initialState }) => {
	app.directive("reveal", { mounted(el) {
		el.classList.add("reveal-item");
		if (isClient) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						el.classList.add("is-visible");
						observer.unobserve(el);
					}
				});
			}, {
				threshold: .1,
				rootMargin: "0px 0px -50px 0px"
			});
			observer.observe(el);
		}
	} });
});
//#endregion
export { createApp };
