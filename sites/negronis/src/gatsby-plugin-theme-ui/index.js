import { roboto as theme } from '@theme-ui/presets';

export default {
    ...theme,
    colors: {
        ...theme.colors,
        muted: '#555',
    },
    button: {
        primary: {
            // ...buttonDefaults,
            bg: 'primary',
            color: 'background',
            ':focus': {
                // ...buttonDefaults[':focus'],
                bg: 'secondary',
            },
            ':hover': {
                bg: 'secondary',
            },
        },
        hollow: {

            bg: 'background',
            border: theme => `1px solid ${theme.colors.primary}`,
            borderRadius: 10,
            display: 'inline-block',
            fontFamily: 'heading',
            fontWeight: 'bold',
            p: 2,
            color: 'primary',
            ':focus': {

                bg: 'highlight',
            },
            ':hover': {
                bg: 'highlight',
            },
        },
    },
}