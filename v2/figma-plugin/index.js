const COLLECTION_ID = {
    Primitives: 'VariableCollectionId:1:34093',
    Colors: 'VariableCollectionId:1:34181',
    Typography: 'VariableCollectionId:124:14306',
    Sizes: 'VariableCollectionId:124:14485',
    Elevations: 'VariableCollectionId:150:18224'
};

const THEME = {
    light: '1:1',
    dark: '1:2'
};

figma.showUI(__html__);

figma.ui.on('message', (msg) => {
    switch (msg.type) {
        case 'generate':
            generate(msg.options);
            break;
        case 'copy':
            console.log('asd');
            copy();
            break;
        case 'cancel':
            figma.closePlugin();
            break;
        default:
            break;
    }
});

/**
 * @param {{format:'json'|'css';theme:'light'|'dark';color:'rgba'|'hex'|'hsla'}} options
 */
async function generate(options) {
    console.clear();
    const color_mode = THEME[options.theme];
    const typography_mode = '124:1';
    const [primitives, colors, typography, sizes, elevations] = await Promise.all([
        figma.variables.getVariableCollectionByIdAsync(COLLECTION_ID.Primitives),
        figma.variables.getVariableCollectionByIdAsync(COLLECTION_ID.Colors),
        figma.variables.getVariableCollectionByIdAsync(COLLECTION_ID.Typography),
        figma.variables.getVariableCollectionByIdAsync(COLLECTION_ID.Sizes),
        figma.variables.getVariableCollectionByIdAsync(COLLECTION_ID.Elevations)
    ]);
    /** @type {Map<string, string>} */
    const variables = new Map();

    for (const variable_id of primitives.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variable_id);
        variables.set(
            variable.name,
            variable_value_to_rgba(variable.valuesByMode[primitives.defaultModeId])
        );
    }
    for (const variable_id of colors.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variable_id);
        const color = await resolve_color_variable(variable, color_mode);
        variables.set(variable.name, color);
    }
    for (const variable_id of typography.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variable_id);
        let value = variable.valuesByMode[typography_mode];
        if (variable.resolvedType === 'FLOAT') {
            value += 'px';
        }
        variables.set(variable.name, value);
    }
    for (const variable_id of sizes.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variable_id);
        const size = await resolve_size_variable(variable, sizes.defaultModeId);
        variables.set(variable.name, size);
    }
    for (const variable_id of elevations.variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variable_id);
        const value = await resolve_size_variable(variable, elevations.defaultModeId);
        variables.set(variable.name, value);
    }

    const css = Array.from(variables).reduce((acc, [name, value]) => {
        return `${acc}--${transform_css_variable(name)}: ${value};\n`;
    }, '');
    const json = JSON.stringify(
        Array.from(variables).reduce((acc, [name, value]) => {
            acc[transform_css_variable(name)] = value;

            return acc;
        }, {}),
        null,
        4
    );

    const output = options.format === 'json' ? json : css;

    figma.ui.postMessage({ type: 'generated', data: output });
}

/**
 * @param {string} name
 * @returns {string}
 */
function transform_css_variable(name) {
    return name.replaceAll('/', '-').toLowerCase();
}

/**
 * @param {Variable} variable
 * @param {string} color_mode
 * @returns {Promise<Variable>}
 */
async function resolve_size_variable(variable, color_mode) {
    const value = variable.valuesByMode[color_mode];
    if (value.type === 'VARIABLE_ALIAS') {
        const alias = await figma.variables.getVariableByIdAsync(value.id);

        return `var(${transform_css_variable(alias.name)})`;
    }

    return value + 'px';
}

/**
 * @param {Variable} variable
 * @param {string} color_mode
 * @returns {Promise<Variable>}
 */
async function resolve_color_variable(variable, color_mode) {
    const value = variable.valuesByMode[color_mode];
    if (value.type === 'VARIABLE_ALIAS') {
        const alias = await figma.variables.getVariableByIdAsync(value.id);

        return `var(${transform_css_variable(alias.name)})`;
    }

    return variable_value_to_rgba(value);
}

function copy() {
    figma.ui.postMessage({ type: 'copy' });
    figma.notify('📋 Styles copied to clipboard.');
}

/**
 * @param {VariableValue} value
 */
function variable_value_to_rgba({ r, g, b, a }) {
    const parse = (value) => parseInt(value * 255);
    return `rgba(${parse(r)}, ${parse(g)}, ${parse(b)}, ${parse(a)})`;
}
