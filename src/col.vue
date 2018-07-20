<template>
    <div class="col"
         :class="colClass"
         :style="colStyle"
    >
        <slot/>

    </div>
</template>

<script>
    let validator = (value)=>{
        let keys = Object.keys(value);
        let vaild = true;
        keys.forEach((key) => {
            if (!['span', 'offset'].includes(key)) {
                vaild = false
            }
        });
        return vaild;
    };
    export default {
        name: 'g-col',
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            },
            ipad: {
                type: Object,
                validator,
            },
            narrowPc: {
                type: Object,
                validator,
            },
            pc: {
                type: Object,
                validator,
            },
            widePc: {
                type: Object,
                validator,
            },

        },
        data() {
            return {
                gutter: 0
            }
        },
        computed: {
            colClass() {
                let {span, offset, ipad, narrwoPc,pc,widePc} = this;
                return [
                    span && `col-${span}`,
                    offset && `offset-${offset}`,
                    ...(ipad&&[`col-ipad-${ipad.span}`]),
                    ...(narrwoPc&&[`col-narrow-${narrwoPc.span}`]),
                    ...(pc&&[`col-pc-${pc.span}`]),
                    ...(widePc&&[`col-wide-${widePc.span}`]),
                ]

            },
            colStyle() {
                return {
                    paddingLeft: this.gutter / 2 + 'px',
                    paddingRight: this.gutter / 2 + 'px',

                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .col {
        height: 100px;
        border: 1px solid grey;
        /*width: 50%;*/
    }

    /*生成col*/
    .generate-columns(@n, @i: 1) when (@i =< @n) {
        .col-@{i} {
            width: (@i * 100% / @n);
        }
        .generate-columns(@n, (@i + 1));
    }

    .generate-columns(24);

    /*生成offset*/
    .generate-offset(@n, @i: 1) when (@i =< @n) {
        .offset-@{i} {
            margin-left: (@i * 100% / @n);
        }
        .generate-offset(@n, (@i + 1));
    }

    .generate-offset(24);

    /*生成col-ipad*/
    @media (min-width: 577px)and (max-width: 768px){
        .generate-columns(@n, @i: 1) when (@i =< @n) {
            .col-ipad-@{i} {
                width: (@i * 100% / @n);
            }
            .generate-columns(@n, (@i + 1));
        }

        .generate-columns(24);
    }

    /*生成offset-ipad*/
    @media (min-width: 577px)and (max-width: 768px) {
        .generate-offset(@n, @i: 1) when (@i =< @n) {
            .offset-ipad-@{i} {
                margin-left: (@i * 100% / @n);
            }
            .generate-offset(@n, (@i + 1));
        }

        .generate-offset(24);
    }
    /*生成col-narrow 窄pc*/
    @media (min-width: 769px)and (max-width: 992px){
        .generate-columns(@n, @i: 1) when (@i =< @n) {
            .col-narrow-@{i} {
                width: (@i * 100% / @n);
            }
            .generate-columns(@n, (@i + 1));
        }

        .generate-columns(24);
    }

    /*生成offset-narrow*/
    @media (min-width: 769px)and (max-width: 992px) {
        .generate-offset(@n, @i: 1) when (@i =< @n) {
            .offset-narrow-@{i} {
                margin-left: (@i * 100% / @n);
            }
            .generate-offset(@n, (@i + 1));
        }

        .generate-offset(24);
    }
    /*生成col-pc 窄pc*/
    @media (min-width: 993px)and (max-width: 1200px){
        .generate-columns(@n, @i: 1) when (@i =< @n) {
            .col-pc-@{i} {
                width: (@i * 100% / @n);
            }
            .generate-columns(@n, (@i + 1));
        }

        .generate-columns(24);
    }

    /*生成offset-pc*/
    @media (min-width: 993px)and (max-width: 1200px) {
        .generate-offset(@n, @i: 1) when (@i =< @n) {
            .offset-pc-@{i} {
                margin-left: (@i * 100% / @n);
            }
            .generate-offset(@n, (@i + 1));
        }

        .generate-offset(24);
    }
    /*生成col-wide 宽pc*/
    @media (min-width: 993px)and (max-width: 1200px){
        .generate-columns(@n, @i: 1) when (@i =< @n) {
            .col-wide-@{i} {
                width: (@i * 100% / @n);
            }
            .generate-columns(@n, (@i + 1));
        }

        .generate-columns(24);
    }

    /*生成offset-wide*/
    @media (min-width: 1201px) {
        .generate-offset(@n, @i: 1) when (@i =< @n) {
            .offset-wide-@{i} {
                margin-left: (@i * 100% / @n);
            }
            .generate-offset(@n, (@i + 1));
        }

        .generate-offset(24);
    }




</style>