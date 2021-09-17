import { mount, flushPromises } from "@vue/test-utils";
import router from "@/router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import { defineComponent } from "@vue/runtime-dom";

// 確認用の各画面のWrapper
const homeWrapper = mount(Home, {
  global: {
    plugins: [router],
  },
});
const aboutWrapper = mount(About);

describe("HelloWorld.vue", () => {
  it("Home.vueからAbout.vueへの遷移", async () => {
    // wrapperにHome.vueを表示させる（初期位置の設定）
    router.push("/");
    await router.isReady();

    // 実際にテストで動かす画面を作成
    const testApp = defineComponent({
      template: `<router-view />`,
    });
    const wrapper = mount(testApp, {
      global: {
        plugins: [router],
      },
    });

    // 遷移前の画面のHTMLがHome.vueと同一か確認
    expect(wrapper.html()).toBe(homeWrapper.html());

    // <a>タグ（今回は<router-link>しかない）を取得し、押下処理
    await wrapper.find("[data-test='router']").trigger("click");
    await flushPromises();

    // 遷移後の画面のHTMLがAbout.vueと同一か確認
    expect(wrapper.html()).toBe(aboutWrapper.html());
  });
});
