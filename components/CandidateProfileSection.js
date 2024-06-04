import React from 'react';
import { View, Text } from 'react-native';

class CandidateProfileSection extends React.PureComponent {
    render() {
        const { title, children } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18 }}>{title}</Text>
                {children}
            </View>
        );
    }
}

export default CandidateProfileSection;
