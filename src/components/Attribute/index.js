import React, { useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { DATE_ATTRS, ENTITY_TYPE_PLURALS } from './constants'

const Attribute = ({name, value, metadata = [], metadataValueKey = 'name', foreignEntityType}) => {
  const entity = useMemo(() => {
    return name.split('_id')[0]
  }, [name])

  const isForeignKey = useMemo(() => {
    return name.split('_id').length > 1
  }, [name])
  
  const valueExtractor = useCallback((key, val) => {
    if (!val) { return val }

    if (DATE_ATTRS.includes(key)) {
      return new Date(val).toUTCString()
    }

    return val
  }, [])
  
  const currentValue = useMemo(() => {
    return valueExtractor(name, value)
  }, [value, valueExtractor])
  
  const foreignValueExtractor = useCallback((foreignEntity, key) => {
    return valueExtractor(key, foreignEntity.attributes[key])
  }, [])

  if (isForeignKey) {
    const foreignEntity = metadata.find((includedEntity) => {
      return parseInt(includedEntity.id) == parseInt(value) && includedEntity.type == (foreignEntityType || entity)
    })
    
    if (!foreignEntity) { return value }
    
    if (foreignValueExtractor) {
      if (ENTITY_TYPE_PLURALS[foreignEntity.type]) {
        return (
          <Link to={`/app/${ENTITY_TYPE_PLURALS[foreignEntity.type]}/${foreignEntity.id}`}>{foreignValueExtractor(foreignEntity, metadataValueKey)}</Link>
        )
      } else {
        return foreignValueExtractor(foreignEntity, metadataValueKey)
      }
    }
  }

  return currentValue
}

export default Attribute