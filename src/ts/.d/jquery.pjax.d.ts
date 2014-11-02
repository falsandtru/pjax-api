/**
 * 
 * jquery.pjax.d.ts
 * 
 * @author falsandtru https://github.com/falsandtru/jquery-pjax
 * @contributor NewNotMoon
 */

/// <reference path="jquery.d.ts"/>

interface JQueryStatic {
    pjax: JQueryPjaxStatic
}

interface JQuery {
    pjax: JQueryPjax
}

interface PjaxSetting {
    area?: any       // string, array
    link?: string
    filter?: any     // string, function()
    form?: string
    scope?: {
        [index: string]: any
        rewrite?(url: string): string
    }
    rewrite?: (document: Document, area: string, host: string) => void
    state?: any      // any, function(event, setting, origLocation, destLocation )
    scrollTop?: any  // number, function( event, setting, origLocation, destLocation ), null, false
    scrollLeft?: any // number, function( event, setting, origLocation, destLocation ), null, false
    ajax?: JQueryAjaxSettings
    contentType?: string
    redirect?: boolean
    cache?: {
        click?: boolean
        submit?: boolean
        popstate?: boolean
        get?: boolean
        post?: boolean
        limit?: number
        size?: number
        mix?: number
        expires?: {
            min?: number
            max?: number
        }
    }
    buffer?: {
      limit?: number
      delay?: number
    }
    load?: {
        head?: string
        css?: boolean
        script?: boolean
        ignore?: string
        reload?: string
        execute?: boolean
        log?: string
        error?: any
        ajax?: JQueryAjaxSettings
    }
    balance?: {
        self?: boolean
        weight?: number
        option?: PjaxSetting
        client?: {
            support?: {
                userAgent?: RegExp
                redirect?: RegExp
            }
            exclude?: RegExp
            cookie?: {
                balance?: string
                redirect?: string
                host?: string
            }
        }
        server?: {
            header?: string
            filter?: RegExp
            respite?: number
        }
        history?: {
            expires?: number
            limit?: number
        }
    }
    wait?: any     // number, function( event, setting, origLocation, destLocation ): number
    fallback?: any // boolean, function( event, setting, origLocation, destLocation ): boolean
    reset?: {
        type?: string
        count?: number
        time?: number
    }
    fix?: {
        location?: boolean
        history?: boolean
        scroll?: boolean
        noscript?: boolean
    }
    database?: boolean
    server?: {
        query?: any // string, object
        header?: {
            area?: boolean
            head?: boolean
            css?: boolean
            script?: boolean
        }
    }
    data?: any
    callback?: (event?: JQueryEventObject, setting?: PjaxSetting) => any
    callbacks?: {
        ajax?: {
            xhr?: (event?: JQueryEventObject, setting?: PjaxSetting) => JQueryXHR
            beforeSend?: (event?: JQueryEventObject, setting?: PjaxSetting, data?: string, ajaxSettings?: any) => any
            dataFilter?: (event?: JQueryEventObject, setting?: PjaxSetting, data?: string, dataType?: any) => string
            success?: (event?: JQueryEventObject, setting?: PjaxSetting, data?: string, textStatus?: string, jqXHR?: JQueryXHR) => any
            error?: (event?: JQueryEventObject, setting?: PjaxSetting, jqXHR?: JQueryXHR, textStatus?: string, errorThrown?: any) => any
            complete?: (event?: JQueryEventObject, setting?: PjaxSetting, jqXHR?: JQueryXHR, textStatus?: string) => any
        }
        update?: {
            redirect?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            url?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            rewrite?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            title?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            head?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            content?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            css?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            script?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            scroll?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
            balance?: {
                before?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
                after?: (event?: JQueryEventObject, setting?: PjaxSetting) => boolean
            }
        }
    }
}

interface PjaxCache {
    data: string
    textStatus: string
    jqXHR: JQueryXHR
    expires: number
}

interface JQueryPjaxStatic extends PJAX.Core<JQueryPjaxStatic, JQueryPjax>, JQueryStatic {
}

interface JQueryPjax extends PJAX.Core<JQueryPjax, JQueryPjax>, JQuery {
    click(): JQueryPjax
    click(url: string, attrs?: {}): JQueryPjax
    click(url: HTMLAnchorElement): JQueryPjax
    click(url: JQuery): JQueryPjax
    submit(): JQueryPjax
    submit(url: string, attrs: {}, data: any): JQueryPjax
    submit(url: HTMLFormElement): JQueryPjax
    submit(url: JQuery): JQueryPjax
}

declare module PJAX {
    interface Core<T, U> extends Constructor<T, U>, Method<T> {
    }

    interface Constructor<T, U> {
        (): U
        (setting: PjaxSetting): U
    }

    interface Method<T> {
        enable(): T
        disable(): T
        click(): T
        click(url: string, attrs?: {}): T
        click(url: HTMLAnchorElement): T
        click(url: JQuery): T
        submit(): T
        submit(url: string, attrs: {}, data: any): T
        submit(url: HTMLFormElement): T
        submit(url: JQuery): T
        setCache(): T
        setCache(url: string): T
        setCache(url: string, data: string): T
        setCache(url: string, data: string, textStatus: string, jqXHR: JQueryXHR): T
        getCache(): PjaxCache
        getCache(url: string): PjaxCache
        removeCache(url: string): T
        removeCache(): T
        clearCache(): T
        follow(event: JQueryEventObject, ajax: JQueryXHR, host?: string): boolean
        host(): string
    }
}
