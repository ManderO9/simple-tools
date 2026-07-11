<template>

    <!-- TODO: add meta tags to describe what does the page do -->
    <!-- TODO: publish website on github pages -->
    <!-- TODO: add short description to what does the page do -->
    <!-- TODO: test iframes and see how many websites support them -->
    <div class="mb-5 is-size-5">Enter a url and get its content</div>
    <input type="text" v-model="url" placeholder="Enter URL to test" class="input" />

    <div class="has-text-right my-4">

        <div class="select mr-5">
            <select @change="url = ($event?.target as any).value">
                <option value="" disabled selected hidden>select from history</option>
                <option v-for="website in websitesHistory" :key="website" :value="website">
                    {{ website }}
                </option>
            </select>
        </div>
        <button class="button is-link" @click="getUrl">Test Website</button>
    </div>

    <div class="mb-5 is-flex is-align-items-center">
        <span class="is-size-5 mr-5">Scraped Content</span>
        <button class="button is-text"
            @click="isScrapedContentSectionDisplayed = !isScrapedContentSectionDisplayed">Toggle Scraped
            Content</button>
    </div>
    <textarea v-show="isScrapedContentSectionDisplayed" rows="15" v-model="scrapedContent" class="textarea"
        placeholder="Scraped content will appear here"
        style="white-space:pre;overflow-x:auto;overflow-wrap:normal;word-break:normal"></textarea>


    <div class="mb-5 mt-6 is-flex is-align-items-center">
        <span class="is-size-5 mr-5">HTML visualization of scraped content</span>
        <button class="button is-text" @click="isPagePreviewDisplayed = !isPagePreviewDisplayed">Toggle Page
            Preview</button>
    </div>
    <div v-show="isPagePreviewDisplayed" class="has-radius-normal px-5 py-6"
        style="border:2px solid var(--bulma-border); max-width:100vw; max-height:100vh; overflow:auto; position: relative;">
        <div v-html="isPagePreviewDisplayed ? scrapedContent : ''"></div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { onMounted } from 'vue'
import { ToastService } from '@/services/ToastService';

const router = useRouter();
const route = useRoute();
const url = computed<string>({
    get() { return route.query.url as string || ''; },
    set(value) {
        router.replace({
            query: {
                ...route.query,
                url: value
            }
        })
    }
});

const scrapedContent = ref('');
const isScrapedContentSectionDisplayed = ref(true);
const isPagePreviewDisplayed = ref(true);

const websitesHistory = ref<string[]>([]);

const historyKey = "scrape-sites-website-history";

onMounted(() => {
    websitesHistory.value = JSON.parse(localStorage.getItem(historyKey) ?? "[]");
});


async function getUrl() {

    if (url.value.trim() === '') {
        ToastService.showError('Please enter a URL');
        return;
    }

    if (websitesHistory.value.indexOf(url.value) === -1) {
        websitesHistory.value.unshift(url.value);
        localStorage.setItem(historyKey, JSON.stringify(websitesHistory.value));
    }



    var requestUrl = (url.value.startsWith('http') ? url.value : 'https://' + url.value);
    requestUrl = "https://corsproxy.io/?url=" + encodeURIComponent(requestUrl);

    var response = await ToastService.showToastForTaskAsync<any>(fetch(requestUrl), "fetching URL...");

    if (response == null) {
        ToastService.showError("didn't receive a response from the server");
        return;
    }

    scrapedContent.value = await response.text();

    if (response.status !== 200) {
        ToastService.showError('response status code: ' + response.status);
        return;
    }
}

</script>