using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;

namespace EQNWebsiteUI.Classes
{
    internal sealed class ObjectCacheManager<T>
    {
        /// <summary>
        /// private instance
        /// </summary>
        private static volatile ObjectCacheManager<T> instance = new ObjectCacheManager<T>();

        /// <summary>
        /// the backing store
        /// </summary>
        private volatile Hashtable backingStore = null;

        /// <summary>
        /// the object for thread sync
        /// </summary>
        private object syncRoot = new object();

        /// <summary>
        /// private constructer ensures only one instance 
        /// </summary>
        private ObjectCacheManager()
        {
        }

        /// <summary>
        /// singleton instance
        /// </summary>
        public static ObjectCacheManager<T> Instance
        {
            get
            {
                return instance;
            }
        }

        /// <summary>
        /// Provides all access to the backing store
        /// </summary>
        /// 
        /// <param name="key">The key for adding to the backing store.</param>
        /// <param name="resource">The value for adding to the backing store.</param>
        /// <param name="clear">Flag indicating whether to clear all items or not.</param>
        /// <returns>The backing store</returns>
        ///
        private Hashtable BackingStoreAction(string key = null, object resource = null, bool clear = false)
        {
            lock (syncRoot)
            {
                if (clear && backingStore != null)
                {
                    HttpContext.Current.Cache.Remove("ObjectBackingStore");
                    backingStore.Clear();
                }

                if (HttpContext.Current.Cache["ObjectBackingStore"] == null)
                {
                    if (backingStore == null)
                    {
                        backingStore = new Hashtable();
                    }

                    HttpContext.Current.Cache.Insert("ObjectBackingStore", backingStore, null, DateTime.Now.AddMinutes(20), Cache.NoSlidingExpiration);
                }

                if (key != null)
                {
                    backingStore = HttpContext.Current.Cache["ObjectBackingStore"] as Hashtable;

                    if (!backingStore.ContainsKey(key))
                    {
                        backingStore.Add(key, resource);
                    }
                    else {
                        backingStore[key] = resource;
                    }

                    HttpContext.Current.Cache.Remove("ObjectBackingStore");
                    HttpContext.Current.Cache.Insert("ObjectBackingStore", backingStore, null, DateTime.Now.AddMinutes(20), Cache.NoSlidingExpiration);
                }

                return HttpContext.Current.Cache["ObjectBackingStore"] as Hashtable;
            }
        }

        public bool Contains(string key)
        {
            Hashtable backingStore = BackingStoreAction();
            return  backingStore.ContainsKey(key);
        }
        public T this[string key]
        {
            get
            {
                Hashtable backingStore = BackingStoreAction();
                if (backingStore[key] != null)
                {
                    return (T)backingStore[key];
                }
                throw new ArgumentOutOfRangeException("key", "Key value does not exist in backing store.");
            }
        }
        public void Add(string key, object resource)
        {
            BackingStoreAction(key, resource);
        }

        public void Clear()
        {
            BackingStoreAction(null, null, true);
        }

    }
}