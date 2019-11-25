const path = require('path');
const { EventEmitter } = require('events');
const del = require('del');
const {dest, series, src, watch, parallel} = require('gulp');
const shell = require('gulp-shell');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const argv = require('yargs').argv;
const fs = require('fs');
const environmentVariablesPreConfig = require('./node_modules/igniteui-docfx-template/post-processors/PostProcessors/EnvironmentVariables/preconfig.json');
const fileinclude = require('gulp-file-include');
const slash = require("slash");

const LANG = argv.lang === undefined ? "en" : argv.lang;
const DOCFX_BASE = {
    en: './en',
    jp: './jp',
    kr: './kr'
};
const DOCFX_PATH = `${DOCFX_BASE[LANG]}`;
const DOCFX_CONF = `${DOCFX_PATH}/docfx.json`;
const DOCFX_TEMPLATE = slash(path.join(__dirname, `./node_modules/igniteui-docfx-template/template`));
const DOCFX_SITE = `${DOCFX_PATH}/_site`;
const DOCFX_ARTICLES = `${DOCFX_PATH}/components`;

const cleanup =  async (done) => {
     await del(`${DOCFX_SITE}`).then(()=>{
         done()
     });
}

const environmentVariablesConfig =  (done) => {
    var environmentVariablesConfig = JSON.parse(JSON.stringify(environmentVariablesPreConfig));

    if (process.env.NODE_ENV) {
        environmentVariablesConfig.environment = process.env.NODE_ENV.trim();
    }

    environmentVariablesConfig.variables =
        environmentVariablesConfig.variables[LANG.toLowerCase().trim()][
        environmentVariablesConfig.environment
        ];

    if (!fs.existsSync(`${DOCFX_SITE}`)) {
        fs.mkdirSync(`${DOCFX_SITE}`);
    }

    fs.writeFileSync(
        `${DOCFX_SITE}/${environmentVariablesConfig._configFileName}`,
        JSON.stringify(environmentVariablesConfig)
    );
    done();
}

const generateGridsTopics = (done) => {

    const grids = [
        {
            igPath: '/grid',
            igMainTopic: 'grid',
            igObjectRef: "grid",
            igComponent: "Grid",
            igxName: "IgxGrid",
            igTypeDoc: "igxgridcomponent",
            igSelector: "igx-grid"
        },
        {
            igPath: '/treegrid',
            igMainTopic: 'tree_grid',
            igObjectRef: "treeGrid",
            igComponent: "Tree Grid",
            igxName: "IgxTreeGrid",
            igTypeDoc: "igxtreegridcomponent",
            igSelector: "igx-tree-grid"
        },
        {
            igPath: '/hierarchicalgrid',
            igMainTopic: 'hierarchical_grid',
            igObjectRef: "hierarchicalGrid",
            igComponent: "Hierarchical Grid",
            igxName: "IgxHierarchicalGrid",
            igTypeDoc: "igxhierarchicalgridcomponent",
            igSelector: "igx-hierarchical-grid"
        }
    ];

    for (let j = 0; j < grids.length; j++) {
        const grid = grids[j];

        src([DOCFX_ARTICLES + '/grids_templates/*.md'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file',
                context: {
                    "igMainTopic": grid.igMainTopic,
                    "igObjectRef": grid.igObjectRef,
                    "igComponent": grid.igComponent,
                    "igxName": grid.igxName,
                    "igTypeDoc": grid.igTypeDoc,
                    "igSelector": grid.igSelector
                }
            }))
            .pipe(dest(DOCFX_ARTICLES + grid.igPath));
    }
    done();
}

const  styles = () => {
  return src(`${DOCFX_TEMPLATE}/styles/sass/main.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascase: false
            })
        )
        .pipe(dest(`${DOCFX_TEMPLATE}/styles/css`));
};

const buildSite = async() => {
     await shell.task(`docfx build ${DOCFX_CONF}`)();
}

const watchFiles = (done) => {
    
    const excluded = [
        `!${DOCFX_ARTICLES}/grid/**`,
        `!${DOCFX_ARTICLES}/treegrid/**`,
        `!${DOCFX_ARTICLES}/hierarchicalgrid/**`
    ];

    // All topics that are not auto-generated and are specific to the respective grid, should be here.
    const included = [
        `${DOCFX_ARTICLES}/grid/grid.md`,
        `${DOCFX_ARTICLES}/grid/groupby.md`,
        `${DOCFX_ARTICLES}/grid/paste_excel.md`,
        `${DOCFX_ARTICLES}/treegrid/tree_grid.md`,
        `${DOCFX_ARTICLES}/treegrid/aggregations.md`,
        `${DOCFX_ARTICLES}/treegrid/load_on_demand.md`,
        `${DOCFX_ARTICLES}/hierarchicalgrid/hierarchical_grid.md`,
        `${DOCFX_ARTICLES}/hierarchicalgrid/load_on_demand.md`
    ];

    // watch([`${DOCFX_TEMPLATE}/**/*`, `!${DOCFX_TEMPLATE}/styles/css`], series(build));
    watch([
           `${DOCFX_TEMPLATE}/**/*`,
           `!${DOCFX_TEMPLATE}/styles/css/main.css`,
          ,`${DOCFX_PATH}/components/*.md`,
           `${DOCFX_PATH}/general/**/*.md`,
           `${DOCFX_PATH}/themes/*.md`,
           `${DOCFX_ARTICLES}/**`].concat(excluded).concat(included),
            {delay: 3000},
            series(build, browserSyncReload));
    done();
}

const init = (done) => {
    browserSync.init({
        server: {
            baseDir: `${DOCFX_SITE}`
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                margin: '0px',
                padding: '5px',
                position: 'fixed',
                fontSize: '10px',
                zIndex: '9999',
                borderRadius: '5px 0px 0px',
                color: 'white',
                textAlign: 'center',
                display: 'block',
                backgroundColor: 'rgba(60, 197, 31, 0.498039)'
            }
        }
    });
    done();
};

const  browserSyncReload = (done) => {
    browserSync.reload();
    done();
};

const postProcessorConfigs = series(cleanup, environmentVariablesConfig);
const build = series(styles, postProcessorConfigs, generateGridsTopics, buildSite);

exports.build = build;
exports.serve = series(build, init, watchFiles);
exports.buildTravis = series(parallel(styles), postProcessorConfigs, generateGridsTopics);
