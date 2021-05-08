<template>
<div>

        <editor  v-model="content" :init="init"></editor>

</div>
</template>

<script>
    import tinymce from "tinymce/tinymce";
    import Editor from "@tinymce/tinymce-vue";
    import "tinymce/icons/default/icons";
    import "tinymce/themes/silver";
    // 插件配置
    import "tinymce/plugins/preview";
    import "tinymce/plugins/image";
    import "tinymce/plugins/lists";
    import "tinymce/plugins/advlist";
    import "tinymce/plugins/code";
    import "tinymce/plugins/link";
    import "tinymce/plugins/hr";
    import "tinymce/plugins/autolink";
    import "tinymce/plugins/imagetools";
    import "tinymce/plugins/autoresize";

    export default {
        name: "JRichText",
        data() {
            return {
                init: {
                    language_url: "/tinymce/langs/zh_CN.js", // 中文语言包路径
                    language: "zh_CN",
                    skin_url: "/tinymce/skins/ui/oxide",
                    width:this.width,
                    min_height:this.height,
                    toolbar_mode: "wrap",
                    menubar:false,
                    plugins:  "preview  autolink    image link   code    hr   advlist lists  imagetools    autoresize",
                    toolbar: " undo  redo removeformat|  bold italic underline strikethrough  | forecolor backcolor | alignleft aligncenter alignright  outdent indent lineheight formatpainter | \
    formatselect  fontsizeselect | bullist numlist | \
    image  link hr   |   preview  code",
                    fontsize_formats: "12px 14px 16px 18px 24px 36px",
                    formats: {
                        // Changes the default format for h1 to have a class of heading
                        h1: { block: 'h1', styles:{color:'#333333',fontSize:'18px',fontWeight:'bold'}},
                        h3: { block: 'h3', styles:{color:'#00A1FF',fontSize:'14px',fontWeight:'bold'}},
                        p:  { block: 'p', styles:{color:'#333333',fontSize:'14px',fontWeight:'normal'}}
                    },
                    block_formats: '一级标题=h1;小标题=h3;正文=p;',

                    branding: false,
                    // 外部css  很重要的参数
                    content_css:'/tinymce/content.css',
                    //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                    //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
                    images_upload_handler: (blobInfo, success, failure) => {
                        const img = "data:image/jpeg;base64," + blobInfo.base64();
                        success(img);
                    },
                },
                content: this.value
            }
        },
        props:{
            value: {
                type: String,
                default: ""
            },
            width: {
                default: "100%"
            },
            height: {
                default: 300
            },

        },
        mounted() {
            tinymce.init({})
        },
        watch: {
            content(newValue) {
                this.$emit("input", newValue);
            }
        },
        components:{
            Editor
        }
    }
</script>

<style scoped>

</style>
<style lang="scss">

</style>
