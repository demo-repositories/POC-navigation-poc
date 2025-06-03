import {Card, Autocomplete, Flex, Box, Avatar, Text, BaseAutocompleteOption} from '@sanity/ui'
import {useEffect, useState} from 'react'
import {set} from 'sanity'

export const ProductSearch = (props: any) => {
  const [options, setOptions] = useState<BaseAutocompleteOption[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => {
        setOptions(
          data.map((item) => ({
            name: item.name,
            id: item.id,
            value: item.id,
            images: item.images,
          })),
        )
      })
  }, [])

  const option = options.find((option) => option.id === props.value)

  return (
    <>
      <Text>Featured Product</Text>
      {option && (
        <Card>
          <Flex align="center">
            <Box padding={1}>
              <Avatar size={1} src={option.images.main} />
            </Box>
            <Box padding={2} paddingLeft={1}>
              <Text size={[2, 2, 3]}>{option.name}</Text>
            </Box>
            <Box padding={2} paddingLeft={1}>
              <Text size={[2, 2, 3]}>And any other information you can get from the API</Text>
            </Box>
          </Flex>
        </Card>
      )}
      <Card>
        <Autocomplete
          // custom search filter
          filterOption={(query, option) =>
            option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          }
          fontSize={[2, 2, 3]}
          // icon={SearchIcon}
          openButton
          options={options}
          onSelect={(value) => {
            console.log('select', {value})
          }}
          onChange={(value) => {
            console.log('change', {value})
            props.inputProps.onChange(set(value))
          }}
          value={props.inputProps.value}
          id={props.id}
          padding={[3, 3, 4]}
          placeholder="Type to find a product"
          // custom option render function
          renderOption={(option) => (
            <Flex align="center">
              <Box padding={1}>
                <Avatar size={1} src={option.images.main} />
              </Box>
              <Box flex={1} padding={2} paddingLeft={1}>
                <Text size={[2, 2, 3]}>{option.name}</Text>
              </Box>
            </Flex>
          )}
          // custom value render function
          renderValue={(value, option) => {
            return option?.name || value
          }}
        />
      </Card>
    </>
  )
}
