import React from 'react';

const withFetching = (Wrapped, Loading, loader) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                isLoading: true,
                error: null,
            };
        }

        async componentDidMount() {
            try {
                const data = await loader(this.props);
                this.setState({ data, isLoading: false });
            } catch (error) {
                this.setState({ error, isLoading: false });
            }
        }

        render() {
            const { data, isLoading, error } = this.state;
            if (isLoading) {
                return <Loading text='Loading...'/>;
            }

            if (error) {
                return <div>Error: {error.message}</div>;
            }

            return <Wrapped {...this.props} data={data} />;
        }
    };
};

export default withFetching;

