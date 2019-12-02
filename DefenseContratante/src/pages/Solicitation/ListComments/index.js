import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, List, ListItem, Icon } from 'react-native-ui-kitten';
import theme from '../../../theme/theme';
import { textStyle } from '../../../theme/textStyles';
import { useAsync } from 'react-async';
import { findProviderComments } from '../../../services/api';
import { PacmanIndicator } from 'react-native-indicators';
import { toBRDate } from '../../../utils/converters/date';

const ListComments = ({ navigation }) => {
    const [comments, setComments] = useState([])
    
    const { data, isResolved, isLoading } = useAsync({
        promiseFn: findProviderComments,
        id: navigation.state.params.id
    });

    const renderItem = ({ index, item }) => {
        return (
            <ListItem style={styles.itemContainer}>
                <View style={styles.fullWidth}>
                    <View style={styles.lineFlex}>
                        <View style={styles.column}>
                            <Icon name="calendar-outline" fill={theme['color-primary-500']} height={24} width={24} />
                            <Text style={{marginLeft: 30}} appearance='hint'>{toBRDate(new Date(item.evaluationDate))}</Text>
                        </View>
                    </View>
                    <View style={styles.lineFlex}>
                        <Text
                            appearance='hint'
                            style={[textStyle.paragraph]}
                            category='p2'>
                            {item.comment}
                        </Text>
                    </View>
                </View>
            </ListItem>);
    }

    useEffect(() => {
        if (isResolved) {
            setComments(data);
        }
    }, [data]);

    return (
        <Layout style={{ flex: 1, backgroundColor: '#1a2138', padding: 20 }} theme={theme}>
            <View style={styles.container}>
                <Text category="h5" status="primary" style={styles.text}>Comentários do prestador</Text>
                {isLoading && <PacmanIndicator color={theme["color-primary-500"]} />}

                <List
                    numColumns={1}
                    renderItem={renderItem}
                    data={comments}
                />
            </View>
        </Layout>
    );
}
const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    },
    container: {
        flexDirection: 'column',
        flex: 1
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
        width: '100%'
    },
    listItem: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        flexDirection: 'column',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5,
        width: '100%'
    },
    detailsContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    lineFlex: {
        paddingVertical: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    column: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default ListComments;
